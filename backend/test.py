from langchain import PromptTemplate, LLMChain, OpenAI
from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain.agents import create_csv_agent
from langchain.agents.agent_types import AgentType
from langchain.chat_models import ChatOpenAI
import os
from dotenv import load_dotenv
from langchain.output_parsers import CommaSeparatedListOutputParser

from langchain.chains import ConversationalRetrievalChain
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA  
from langchain import HuggingFaceHub
from langchain.vectorstores import Chroma


load_dotenv()

item_data = os.getenv("ITEM_DATA_CSV")
item_images = os.getenv("ITEM_IMAGE_CSV")
mapped_outfits = os.getenv("MAPPED_OUTFITS_CSV")




item_data_loader = CSVLoader(
    file_path=item_data, encoding="utf-8", csv_args={"delimiter": ","}
)
items = item_data_loader.load()

# llm = HuggingFaceHub(repo_id = "google/flan-t5-xl", huggingfacehub_api_token = "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")

llm = OpenAI(temperature=0)
# id_chain = LLMChain(
#     llm=llm,
#     prompt=PromptTemplate.from_template("Find all blue shirts (ids)"),
#     output_key="ids"
# )
# template = """Get images
# {ids}
# Review from a New York Times play critic of the above play:"""
# prompt_template = PromptTemplate(input_variables=["synopsis"], template=template)
# image_chain = LLMChain(llm=llm, prompt=prompt_template, output_key="review")

# files = item_data

id_agent = create_csv_agent(
    llm,
    files,
    verbose=True,
    # agent_type=AgentType.OPENAI_FUNCTIONS,
    
)

# image_agent = create_csv_agent(
#     llm,
#     item_images,
#     verbose = True,
#     # agent_type=AgentType.OPENAI_FUNCTIONS,
# )

# output_parser = CommaSeparatedListOutputParser()

# res = id_agent.run("I want to wear a blue shirt (get 10 ids)")
# print(res, type(res))
# output = output_parser.parse(res)
# print(image_agent.run(f"Retrieve all the links corresponding to filenames 174, 22395, 12190, 34036, 13846, 22359, 26369, 30802, 34031, 11712, 13283"))

embeddings = OpenAIEmbeddings()
# vectorstore = FAISS.from_documents(items, embeddings)



# chain = ConversationalRetrievalChain.from_llm(
#     llm=llm,
#     retriever=vectorstore.as_retriever(),
# )


# def conversational_chat(query):
#     result = chain(
#         {
#             "question": query,
#         }
#     )

#     return result["answer"]


# print(id_agent.run("I want to wear a blue shirt (get 10 ids)"))

db2 = Chroma.from_documents(items, embeddings, persist_directory="./chroma_db")
docs = db2.similarity_search("I want to wear a blue shirt (get 10 ids)")
print(docs[0].page_content)

# db = Chroma(persist_directory="./chroma_db", embedding_function=OpenAIEmbeddings)

# retriever = db.as_retriever()
# chain = RetrievalQA.from_chain_type(llm = llm, retriever = retriever, verbose=True, chain_type = "stuff")

# print(chain.run("I want to wear a blue shirt (get 10 ids)"))
