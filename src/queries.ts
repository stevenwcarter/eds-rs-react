import { gql } from '@apollo/client';

export const HOTEL_LIST_QUERY = gql`
  query Hotels {
    search(
      params: { repo: "main--eds-rs-2025--stevenwcarter", path: "/data.json", sheet: "hotels" }
    ) {
      total
      offset
      limit
      data
    }
  }
`;

export const ROOM_LIST_QUERY = gql`
  query Rooms {
    search(
      params: { repo: "main--eds-rs-2025--stevenwcarter", path: "/data.json", sheet: "rooms" }
    ) {
      total
      offset
      limit
      data
    }
  }
`;

export const HOTEL_BY_ID = gql`
  query HotelQuery($id: String!) {
    search(
      params: {
        repo: "main--eds-rs-2025--stevenwcarter"
        path: "/data.json"
        sheet: "hotels"
        searchTerm: $id
        searchField: "id"
      }
    ) {
      total
      offset
      limit
      data
    }
  }
`;

export const ROOMS_FOR_HOTEL_ID = gql`
  query RoomsForHotelIdQuery($id: String!) {
    search(
      params: {
        repo: "main--eds-rs-2025--stevenwcarter"
        path: "/data.json"
        sheet: "rooms"
        searchTerm: $id
        searchField: "hotel_id"
      }
    ) {
      total
      offset
      limit
      data
    }
  }
`;
