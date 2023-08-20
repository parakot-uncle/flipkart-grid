# Generated by Django 4.2.4 on 2023-08-20 23:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0002_alter_account_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='Outfit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topwear', models.IntegerField()),
                ('bottomwear', models.IntegerField()),
                ('shoes', models.IntegerField()),
                ('gender', models.CharField(choices=[('girl', 'girl'), ('boy', 'boy'), ('man', 'man'), ('woman', 'woman')], max_length=15)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='authentication.account')),
            ],
        ),
        migrations.CreateModel(
            name='Outfit_Occasion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('occasion', models.CharField(choices=[('formal', 'formal'), ('casual', 'casual'), ('sports', 'sports'), ('ethnic', 'ethnic'), ('smart casual', 'smart casual'), ('travel', 'travel'), ('party', 'party'), ('home', 'home')], max_length=15)),
                ('outfit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='outfit.outfit')),
            ],
        ),
        migrations.CreateModel(
            name='Outfit_Accessory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accessory', models.IntegerField()),
                ('outfit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='outfit.outfit')),
            ],
        ),
    ]