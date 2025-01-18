use std::fs;

use anyhow::Result;
use clap::Parser;
use csv::Writer;
use faker_rand::en_us::names::FirstName;
use rand::{
    distributions::{Distribution, Standard},
    seq::IteratorRandom,
    Rng,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    // #[arg(short, long)]
    // name: String,
    #[arg(short, long, default_value_t = 20)]
    room_count: u32,
    #[arg(short = 'o', long, default_value_t = 20)]
    hotel_count: u32,
}
#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
enum Region {
    North,
    South,
    East,
    West,
}
impl Distribution<Region> for Standard {
    fn sample<R: Rng + ?Sized>(&self, rng: &mut R) -> Region {
        let range: u32 = rng.gen_range(0..4);
        match range {
            0 => Region::North,
            1 => Region::South,
            2 => Region::East,
            _ => Region::West,
        }
    }
}
#[derive(Debug, Clone, Serialize, Deserialize)]
struct Hotel {
    id: Uuid,
    name: String,
    description: String,
    region: Region,
    manager_name: String,
    image: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Room {
    id: Uuid,
    hotel_id: Uuid,
    name: String,
    description: String,
    image: String,
}

impl Room {
    pub fn random<R: Rng + ?Sized>(rng: &mut R, hotel_id: Uuid) -> Self {
        let image_id: u32 = rng.gen_range(1..4);
        Self {
            id: Uuid::now_v7(),
            hotel_id,
            name: "Some name".to_string(),
            description: "Some description".to_string(),
            image: format!("/room-images/room{image_id}.jpg"),
        }
    }
}

impl Hotel {
    pub fn random<R: Rng + ?Sized>(rng: &mut R) -> Self {
        let image_id: u32 = rng.gen_range(1..4);
        Self {
            id: Uuid::now_v7(),
            name: "Some Name".to_string(),
            description: "Some Description".to_string(),
            region: rand::random(),
            manager_name: rand::random::<FirstName>().to_string(),
            image: format!("/hotel-images/hotel{image_id}.jpg"),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct AmenityMapping {
    amenity_id: u32,
    room_id: Option<Uuid>,
    hotel_id: Option<Uuid>,
}

fn main() -> Result<()> {
    let args = Args::parse();
    let mut rng = rand::thread_rng();

    let hotels: Vec<Hotel> = (0..args.hotel_count)
        .map(|_| Hotel::random(&mut rng))
        .collect();

    let rooms: Vec<Room> = hotels
        .iter()
        .map(|h| h.id)
        .flat_map(|hotel_id| {
            (0..args.room_count)
                .map(|_| Room::random(&mut rng, hotel_id))
                .collect::<Vec<Room>>()
        })
        .collect();

    let amenities: Vec<AmenityMapping> = rooms
        .iter()
        .map(|r| r.id)
        .flat_map(|room_id| {
            let amenities: Vec<u32> = (1..25).choose_multiple(&mut rng, 15);
            amenities
                .iter()
                .map(|&a_id| AmenityMapping {
                    room_id: Some(room_id),
                    hotel_id: None,
                    amenity_id: a_id,
                })
                .collect::<Vec<AmenityMapping>>()
        })
        .collect();

    let mut hotel_writer = Writer::from_writer(vec![]);
    hotels.iter().for_each(|h| {
        hotel_writer
            .serialize(h)
            .expect("Could not write hotel row")
    });

    let hotel_csv_data = String::from_utf8(hotel_writer.into_inner()?)?;
    fs::write("hotels.csv", hotel_csv_data)?;

    let mut room_writer = Writer::from_writer(vec![]);
    rooms
        .iter()
        .for_each(|r| room_writer.serialize(r).expect("could not write room row"));

    let room_csv_data = String::from_utf8(room_writer.into_inner()?)?;
    fs::write("rooms.csv", room_csv_data)?;

    let mut amenities_writer = Writer::from_writer(vec![]);
    amenities.iter().for_each(|a| {
        amenities_writer
            .serialize(a)
            .expect("could not write amenity row")
    });

    let amenity_csv_data = String::from_utf8(amenities_writer.into_inner()?)?;
    fs::write("amenities.csv", amenity_csv_data)?;

    Ok(())
}
