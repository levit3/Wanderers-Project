#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
fake = Faker()
import os

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
    print(username[0], email[0], password[0])
    
    for i in range(20):
        user = User(username=username[i], email=email[i], password=password[i])
        users.append(user)
    
    db.session.add_all(users)
    db.session.commit()

def get_images(filename):
    image_path = os.path.join('uploads', filename)
    return image_path

def make_destinations():
    print("Seeding Destinations...")
    Destination.query.delete()
    
    destinations = []
    
    places  = [
        {"name": "Maasai Mara National Reserve", "location": "Narok, Kenya"},
        {"name": "Diani Beach", "location": "Diani Beach, Kenya"},
        {"name": "Mount Kenya", "location": "Mount Kenya, Kenya"},
        {"name": "Karen Blixen Museum", "location": "Karen, Nairobi, Kenya"},
        {"name": "Lamu Old Town", "location": "Lamu Island, Kenya"},
        {"name": "Tamarind Restaurant", "location": "Nairobi, Kenya"},
        {"name": "Royal Nairobi Golf Club", "location": "Nairobi, Kenya"},
        {"name": "Ngong Racecourse", "location": "Ngong Road, Nairobi, Kenya"},
        {"name": "Fairmont The Norfolk Hotel", "location": "Nairobi, Kenya"},
        {"name": "Carnivore Restaurant", "location": "Lang'ata, Nairobi, Kenya"},
        {"name": "CJS Restaurant", "location": "Kilimani, Nairobi, Kenya"},
        {"name": "Karura Forest", "location": "Nairobi, Kenya"},
        {"name": "KICC (Kenyatta International Conference Centre)", "location": "Nairobi, Kenya"},
        {"name": "Kitengela Glass Art", "location": "Kitengela, Kenya"},
        {"name": "Nairobi Railway Museum", "location": "Nairobi, Kenya"},
        {"name": "Nairobi National Museum", "location": "Nairobi, Kenya"},
        {"name": "The Junction Shopping Mall", "location": "Nairobi, Kenya"},
        {"name": "Circle Art Gallery", "location": "Nairobi, Kenya"},
        {"name": "One Off Contemporary Art Gallery", "location": "Nairobi, Kenya"}
        ]
    
    descriptions = [
    "Famous for its spectacular wildlife, Maasai Mara National Reserve is home to the Big Five and hosts the annual Great Migration of wildebeest and zebra, a spectacle of nature.",
    "Renowned for its pristine white sands, crystal-clear turquoise waters, and vibrant coral reefs, Diani Beach offers ideal conditions for beach holidays, snorkeling, and diving.",
    "The second highest mountain in Africa, Mount Kenya boasts diverse ecosystems ranging from equatorial rainforests to snow-capped peaks, attracting climbers and nature enthusiasts alike.",
    "Formerly the home of Danish author Karen Blixen, the museum offers insights into her life in colonial Kenya and her acclaimed literary works, including 'Out of Africa'.",
    "A UNESCO World Heritage Site, Lamu Old Town is renowned for its well-preserved Swahili architecture, winding alleys, and rich cultural heritage dating back centuries.",
    "Located in Nairobi, Tamarind Restaurant is celebrated for its fine seafood dining experience, offering panoramic views of the city skyline along with exquisite culinary delights.",
    "Established in 1906, the Royal Nairobi Golf Club is one of Kenya's oldest and most prestigious golf courses, known for its lush fairways and challenging layout.",
    "A hub for horse racing enthusiasts in Nairobi, Ngong Racecourse hosts thrilling races and social events, drawing a diverse crowd of spectators throughout the year.",
    "An iconic luxury hotel in Nairobi, Fairmont The Norfolk Hotel offers colonial architecture, elegant accommodations, and a rich history dating back to the early 20th century.",
    "Famous for its 'beast of a feast' including a variety of meats grilled on skewers, Carnivore Restaurant offers a unique dining experience in Nairobi with lively entertainment.",
    "Located in Nairobi, CJS is a contemporary shopping destination known for its upscale boutiques, trendy cafes, and vibrant atmosphere, attracting locals and tourists alike.",
    "Karura Forest in Nairobi is a large urban green space popular for walking, cycling, and picnicking amid serene natural surroundings and scenic waterfalls.",
    "An iconic landmark in Nairobi, KICC (Kenyatta International Conference Centre) hosts conferences, events, and offers panoramic views from its rooftop observation decks.",
    "Kitengela Glass Art is a glass blowing studio and gallery in Kitengela known for its unique glass artworks, demonstrations, and vibrant artistic community.",
    "Nairobi Railway Museum showcases Kenya's railway history with a collection of historic locomotives, carriages, and railway artifacts, offering a glimpse into the country's transport heritage.",
    "Nairobi National Museum features exhibits on Kenya's natural and cultural heritage, including art, fossils, ethnographic displays, and botanical gardens.",
    "The Junction Shopping Mall in Nairobi is a popular destination offering a wide range of shops, eateries, and entertainment options for locals and tourists alike.",
    "Circle Art Gallery specializes in contemporary African art, featuring cutting-edge artworks from across the continent and providing a platform for emerging artists.",
    "One Off Contemporary Art Gallery in Nairobi is known for its diverse collection of contemporary art and exhibitions, offering a dynamic space for art enthusiasts."
]
    image_files = [get_images(f"Untitled design ({i}).png") for i in range(19)]
    for i in range(len(descriptions)):
        destination = Destination(name = places[i].get('name'), description = descriptions[i], location = places[i].get('location'), image = image_files[i])
        destinations.append(destination)
    
    db.session.add_all(destinations)
    db.session.commit()
    
def make_reviews():
    print("Seeding reviews...")
    Review.query.delete()
    
    review_list = []

    reviews = [
    [ "Absolutely breathtaking experience! Saw the Big Five in one day.",
        "Great safari trip, but the accommodations could be better.",
        "Overpriced tours, but the scenery was worth it.",
        "Amazing wildlife but encountered a lot of mosquitoes.",
        "Loved the guides and their knowledge.",
        "Disappointing experience overall."],
        
    [ "Beautiful beach with crystal-clear waters and white sand.",
        "Litter on the beach was disappointing.",
        "Perfect spot for relaxation and water sports."],
        
        ["Incredible trekking experience with stunning views.",
        "Weather conditions made the summit unreachable this time.",
        "Difficult hike, but the guides were helpful.",
        "Base camps were lacking in amenities."],
        
        ["Fascinating insight into Kenyan history and culture.",
        "Entry fee seemed high for the exhibits available.",
        "Well-maintained museum with informative guides."],
        
        ["Delicious local cuisine and friendly people.",
        "Tourist crowds can detract from the authentic experience.",
        "Quaint and charming town with unique architecture.",
        "Limited options for accommodation."],
        
        ["Exquisite seafood dining with a view.",
        "Had to wait a long time for a table despite having a reservation."],
        
        ["Fantastic course with well-maintained greens.",
        "Facilities are aging and could use an update.",
        "Friendly staff and a relaxing atmosphere."],
        
    ["Affordable entertainment for families.",
        "Limited seating options for general admission.",
        "Parking can be chaotic during events.",
        "Exciting races and a lively atmosphere."],
        
        ["Historic hotel with elegant decor.",
        "Pricey dining options compared to local alternatives.",
        "Rooms were a bit noisy due to street traffic.",
        "Luxurious stay with impeccable service."],
        
        ["Unique dining experience with lively entertainment.",
        "Service was slow during peak hours.",
        "Delicious variety of meats, especially the game meats."],
        
       [ "CJS is a vibrant shopping hub with a great selection of food and drinks.",
        "I love the trendy atmosphere and variety of food.",
        "CJS offers a fantastic dining experience with stylish friendly services."],
        
        ["Great for picnics and bird watching.",
        "Some areas felt unsafe due to poor lighting.",
        "Serene walking trails and beautiful waterfalls.",
        "Entrance fees for non-residents are too high."],
        
        ["Modern facilities and well-organized events.",
        "Accessibility for disabled visitors could be improved."],
        
        ["Great shopping for souvenirs and gifts.",
        "Unique art pieces and interesting glass-blowing demonstrations.",
        "Items for sale were overpriced.",
        "Studio tours were informative and interactive."],
        
        ["Needs more interactive exhibits.",
        "Limited parking space.",
        "Fascinating collection of historic locomotives.",
        "Educational for both adults and children."],
        
        ["Cafeteria food was disappointing.",
        "Well-curated exhibits and knowledgeable guides.",
        "Entrance fees were higher than expected.",
        "Extensive collection showcasing Kenya's rich heritage."],
        
        ["Some shops were closed during my visit.",
        "Parking is a nightmare during weekends.",
        "Wide selection of shops and restaurants.",
        "Clean and well-maintained facilities."],
        
        ["Friendly and knowledgeable staff.",
        "Limited parking available nearby.",
        "Artworks were overpriced for the local market.",
        "Cutting-edge contemporary art showcased beautifully."],
        
        ["Gallery space felt too small for the exhibits.",
        "Lack of information about the artists on display.",
        "Great for art enthusiasts seeking something different."],
    ]
    ratings = [
        [5, 4, 2, 5, 3, 3],
        [5, 2, 5],
        [5, 2, 4, 3],
        [5, 3, 4],
        [5, 3, 5, 2],
        [5, 2],
        [5, 3, 4],
        [4, 2, 3, 5],
        [4, 3, 2, 5],
        [4, 3, 5],
        [5, 4, 5],
        [4, 2, 5, 3],
        [4, 3],
        [4, 5, 2, 5],
        [2, 3, 5, 4],
        [2, 4, 3, 5],
        [2, 3, 5, 4],
        [2, 4, 3, 5],
        [1, 2, 5],
    ]
    
    for rev in range(len(reviews)):
        for i in range(len(reviews[rev])):
            review = Review(user_id = randint(1, 20), destination_id = rev+1, rating = ratings[rev][i], comment = reviews[rev][i])
            review_list.append(review)

    db.session.add_all(review_list)
    db.session.commit()

     
if __name__ == '__main__':
    with app.app_context():
        print("Starting seed..."),
        make_destinations(), 
        make_users(),
        make_reviews()
        print("Seeding complete!")


