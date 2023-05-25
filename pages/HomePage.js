/**
 * Purpose of the file: It is used to be the first page the user has access to after opening the app / login in through the app
 * - Displays business based on location or depending on the section from either the category or default sections
 */
import { StyleSheet, View, FlatList, Text } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { StatusBar } from "expo-status-bar";
import SearchComponent from "../components/SearchComponent";
import BusinessCard from "../Cards/BusinessCard";
import BusinessListComponent from "../components/BusinessListComponent";
import CategoryScrollBar from "../components/CategoryScrollBar";
import OrderButton from "../components/OrderButton";
import { useAppSelector } from "../store/hook";
import { getButton } from "../store/slices/addToCart";
import useCategoryList from "../hooks/useCategoryList";
import useBusiness from "../hooks/useBusiness";
import { getBusiness } from "../store/slices/BusinessSlice/businessSlice";

export default function HomePage() {
	const {
		categoryWasSelected,
		categoryId,
		categoryList,
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
										categoryList={categoryList}
										itemId={categoryId}
										style={styles.margin}
										showItem={onSelectCategory}
									/>
								</>
							}
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
									categoryList={categoryList}
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
