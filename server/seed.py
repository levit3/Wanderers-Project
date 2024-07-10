#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
fake = Faker()

# Local imports
from app import app
from models import db, User, Destination, Review

def make_users():
    print("Seeding users...") 
    User.query.delete()
    
    users = []
    
    username = [fake.unique.first_name() for _ in range(20)]
    email = [fake.email() for _ in range(20)]
    password = [fake.password(length=8) for _ in range(20)]
    
    for i in range(20):
        user = User(username=username[i], email=email[i], password=password[i])
        users.append(user)
    
    db.session.add_all(users)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
