/**
 * Purpose of the file: It is used to be the first page the user has access to after opening the app / login in through the app
 * - Displays business based on location or depending on the section from either the category or default sections
 */
import { StyleSheet, View, FlatList, Text } from "react-native";
import HeaderComponent from "@components/home/HeaderComponent";
import { StatusBar } from "expo-status-bar";
import SearchComponent from "@components/home/SearchComponent";
import BusinessCard from "@cards/Home/BusinessCard";
import BusinessListComponent from "@components/home/BusinessListComponent";
import CategoryScrollBar from "@components/home/CategoryScrollBar";
import OrderButton from "@components/global/OrderButton";
import { useAppSelector } from "../store/hook";
import { getButton } from "../store/slices/addToCart";
import useCategoryList from "@hooks/handlePages/useCategoryList";
import useBusiness from "@hooks/handleVendors/useBusiness";
import { getBusiness } from "../store/slices/BusinessSlice/businessSlice";

export default function HomePage() {
	const {
		categoryWasSelected,
		categoryId,
		checkForStyleChange,
		onSelectCategory,
	} = useCategoryList();
	const getBusinesses = useAppSelector(getBusiness);

	const { trendingBusiness, business } = useBusiness(getBusinesses);
	let categories = [
		{ name: "Burger", id: 1 },
		{ name: "Cheap", id: 2 },
		{ name: "Best Reviews", id: 3 },
	];
	let foodCategories = [
		{
		  text: 'Grains',
		  foodType: require('@assets/CategoryIcons/bread.png'),
		  key: 1,
		},
		{
		  text: 'Burger',
		  foodType: require('@assets/CategoryIcons/burger.png'),
		  key: 2,
		},
		{
		  text: 'Burrito',
		  foodType: require('@assets/CategoryIcons/burrito.png'),
		  key: 3,
		},
		{
		  text: 'Hot Dog',
		  foodType: require('@assets/CategoryIcons/corndog.png'),
		  key: 4,
		},
		{
		  text: 'Wings',
		  foodType: require('@assets/CategoryIcons/chicken-leg.png'),
		  key: 5,
		},
		{
		  text: 'Fries',
		  foodType: require('@assets/CategoryIcons/fries.png'),
		  key: 6,
		},
		{
		  text: 'Pizza',
		  foodType: require('@assets/CategoryIcons/pizza.png'),
		  key: 7,
		},
	  ]

	const isClicked = useAppSelector(getButton);

	let list = [];

	business.forEach((r) => {
		list = list.concat(r);
	});

	const filterBusinessCards = business.filter(
		(i) => i.categoryId === categoryId
	);

	return (
		<>
			<StatusBar style="auto" />
			<View style={styles.container}>
				<HeaderComponent />

				{!categoryWasSelected ? (
					<>
						<FlatList
							showsVerticalScrollIndicator={false}
							ListHeaderComponent={
								<>
									<SearchComponent />
									<CategoryScrollBar
										categoryList={foodCategories}
										itemId={categoryId}
										style={styles.margin}
										showItem={onSelectCategory}
									/>
								</>
							}
							keyExtractor={(item) => item}
							data={categories}
							ListFooterComponent={
								<FlatList
									ListHeaderComponent={
										<View
											style={
												styles.businessHeaderContainer
											}
										></View>
									}
									showsVerticalScrollIndicator={false}
									data={business}
									keyExtractor={(item) => item.id}
									renderItem={({ item }) => (
										<BusinessCard
											businesItem={item}
											checkForStyleChange={
												!checkForStyleChange
											}
										/>
									)}
								/>
							}
							// Main content of the page
							renderItem={({ item }) => {
								const trendingRow = getBusinesses.filter(
									(business) =>
										business.trendingCategory === item.name
								);
								return (
									<BusinessListComponent
										title={item.name}
										style={styles.list}
										business={trendingRow}
									/>
								);
							}}
						/>
					</>
				) : (
					<>
						<FlatList
							showsVerticalScrollIndicator={false}
							ListHeaderComponent={
								<CategoryScrollBar
									categoryList={foodCategories}
									itemId={categoryId}
									style={styles.margin}
									showItem={onSelectCategory}
								/>
							}
							data={filterBusinessCards}
							keyExtractor={(item) => item}
							renderItem={({ item }) => (
								<BusinessCard
									checkForStyleChange={checkForStyleChange}
									businesItem={item}
								/>
							)}
						/>
					</>
				)}

				{isClicked && <OrderButton />}
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	businessHeaderContainer: {
		margin: 10,
	},
	businessHeader: {
		fontSize: 25,
		fonWeight: 800,
	},
	selectedCategory: {
		backgroundColor: "blue",
	},
	title: {
		marginLeft: 10,
		marginTop: 10,
	},
	margin: {
		backgroundColor: "#f7fafa",
		flex: 1,
		margin: 0,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
	},
	category: {
		paddingVertical: 25,
		flex: 0,
		alignContent: "center",
	},
	list: {
		alignContent: "center",
		flex: 0,
	},
});
