import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import {
	BackgroundImageContainer,
	ContentContainer,
	ContentSubtitle,
	ContentTitle,
	MenuItemContainer,
} from "./menu-item.styles";

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
	const history = useHistory();
	const match = useRouteMatch();
	return (
		<MenuItemContainer
			size={size}
			onClick={() => history.push(`${match.url}${linkUrl}`)}
		>
			<BackgroundImageContainer
				style={{ backgroundImage: `url(${imageUrl})` }}
			/>

			<ContentContainer>
				<ContentTitle>{title.toUpperCase()}</ContentTitle>
				<ContentSubtitle>SHOP NOW</ContentSubtitle>
			</ContentContainer>
		</MenuItemContainer>
	);
};

export default MenuItem;
