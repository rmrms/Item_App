const locationsData = {
  countries: [
    {
      id: 1,
      name: "Country A",
      cities: [
        {
          id: 1,
          name: "City A1",
          locations: [
            {
              id: 1,
              name: "Warehouse A",
              sub_locations: [
                {
                  id: 2,
                  name: "Location 1",
                  sub_locations: [
                    { id: 3, name: "Shelf A" },
                    { id: 4, name: "Shelf B" },
                  ],
                },
                {
                  id: 5,
                  name: "Location 2",
                  sub_locations: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default locationsData;
