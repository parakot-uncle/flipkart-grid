from rest_framework import generics
from .models import Outfit, Outfit_Occasion, Outfit_Accessory
from .serializers import (
    OutfitSerializer,
    OutfitAccessorySerializer,
    OutfitOccasionSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from langchain.llms import OpenAI
from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain.agents import create_csv_agent
from langchain.agents.agent_types import AgentType
import os
from dotenv import load_dotenv
import json
from django.http import JsonResponse
from langchain.output_parsers import CommaSeparatedListOutputParser
import pandas as pd
import re

load_dotenv()

item_data = os.getenv("ITEM_DATA_CSV")
mapped_outfits = os.getenv("MAPPED_OUTFITS_CSV")

llm = OpenAI(temperature=0)

prompt_agent = create_csv_agent(
    llm,
    item_data,
    verbose=True,
)

recommender_agent = create_csv_agent(llm, mapped_outfits, verbose=True)

output_parser = CommaSeparatedListOutputParser()

fashion_df = pd.read_csv(item_data)

pattern = r'\b\d{4,5}\b'  # Match 4 to 5 digits

def get_item_details_from_id(item_id):
    print(type(item_id), item_id)
    try:
        id = int(re.findall(pattern, item_id)[0])
    except:
        id = int(item_id)
    try:
        row = fashion_df[fashion_df["id"] == id]
        image = row["link"].values[0]
        category = row["subCategory"].values[0].lower()
        name = row["productDisplayName"].values[0]
        gender = row["gender"].values[0]

        res = dict()
        res["id"] = id
        res["image"] = image
        res["category"] = category
        res["name"] = name
        res["gender"] = gender

        return res
    except:
        return dict()


class OutfitSelection(APIView):
    def post(self, request, format=None):
        categories = ["topwear", "bottomwear", "shoes"]

        selected_items = request.data.get("selected_items")
        keys = list(selected_items.keys())
        for category in selected_items.keys():
            if category in categories:
                categories.pop(categories.index(category))

        if len(categories) == 1:
            item1 = keys[0]
            item2 = keys[1]
            query = f"Get 3 unique {category[0]} where {item1} = {selected_items[item1]} and {item2} = {selected_items[item2]}"
            result = output_parser.parse(recommender_agent.run(query))
            res = []
            for id in result:
                res.append(get_item_details_from_id(id))
            return JsonResponse({str(categories[0]): res})

        item1 = keys[0]
        result = []
        query = f"Get 3 unique {categories[0]} where {item1} = {selected_items[item1]}"
        result1 = output_parser.parse(recommender_agent.run(query))
        res1 = []

        for id in result1:
            res1.append(get_item_details_from_id(id))

        query = f"Get 2 unique {categories[1]} where {item1} = {selected_items[item1]} and {categories[0]} = "
        for i in range(len(result)):
            query += str(result[i]) + " "
            if i < len(result) - 1:
                query += "or "
        result2 = output_parser.parse(recommender_agent.run(query))
        res2 = []

        for id in result2:
            res2.append(get_item_details_from_id(id))
        return JsonResponse({str(categories[0]): res1, str(categories[1]): res2})


class OutfitPromptList(APIView):
    def post(self, request, format=None):
        query = f"{request.data.get('query')} for {request.data.get('gender')} (Get 5 ids)"

        previous_queries = request.data.get("previous_queries")
        if len(previous_queries) > 0:
            query + "Extract information from previous queries - "
            for prev_query in previous_queries:
                query += prev_query

        result = output_parser.parse(prompt_agent.run(query))
        res = []

        for id in result:
            res.append(get_item_details_from_id(id))

        return JsonResponse({"results": res})
