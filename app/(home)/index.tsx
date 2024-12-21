import { Text,ScrollView, } from "react-native";

import Item from "../../components/Item";
import { useQuery } from "react-query";

import type { ItemType } from "../../types/ItemType";

async function fetchItems(): Promise<ItemType[]> {
	const res = await fetch("http://localhost:8000/posts");
	
    if (!res.ok) {
		throw new Error("Network res was not ok");
	}

	return res.json();
}

export default function Index() {
  const { data, error, isLoading } = useQuery<ItemType[], Error>("posts", fetchItems);

  if(isLoading) return <Text>Loading...</Text>
  if(error) return <Text>Error: hello! There is na ERR!</Text>
  if(!data) return <Text>No data</Text>

  return (
    <ScrollView>
      {data.map(item => (
        <Item 
          key={item.id}
          item={item}
        />
      ))}
    </ScrollView>
  );
}