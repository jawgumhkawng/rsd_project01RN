import React from "react";

import { TextInput, Button, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import type { ItemType } from "../types/ItemType";
import { useTheme } from "@react-navigation/native";

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		height: 100,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 10,
		padding: 10,
		fontSize: 18,
	},
	button: {
		backgroundColor: "blue",
		padding: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
	},
});



const postContent = async (content: string) => {
	const res = await fetch("http://192.168.1.8:8000/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ content }),
	});
	if (!res.ok) {
		throw new Error("Network res was not ok");
	}
	return res.json();
};

export default function Add() {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<{ content: String }>();
	
	const queryClient = useQueryClient();
	const {colors} = useTheme();

	const onSubmit = (data: { content: string }) => {
		add.mutate(data.content);
		router.push("../");
  };
  
  const add = useMutation(postContent, {
		onSuccess: async item => {
			await queryClient.cancelQueries("posts");
		  await queryClient.setQueryData<ItemType[] | undefined>(
			  "posts",
			  old => {
                return old ? [...old, item] : [item];
            });
		},
		onError: error => {
			console.error("Error posting content:", error);
		},
  });
  
  return (
		<View style={styles.container}>
			<Controller
			  control={control}
			  rules={{
				  required: true,
			  }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={[
							styles.input,
							{ color: colors.text, borderColor: colors.border},
							errors.content && {
								borderColor: "red",
							},
						]}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						placeholder="Enter content"
						multiline
					/>
				)}
				name="content"
				defaultValue=""
			/>
			<Button
				title="Submit"
				onPress={handleSubmit(onSubmit)}
			/>
			
		</View>
	);
}