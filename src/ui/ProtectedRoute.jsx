import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
	height: 100vh;
	background-color: var() (--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	// only call navigate inside function (in useEffect or callback function), not on a top level of a component
	const navigate = useNavigate();

	// 1. Load the authenticated user
	const { isLoading, isAuthenticated, isFetching } = useUser();

	//2. If there is no authenticated user, redirect to /login
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading && !isFetching)
				navigate("/login");
		},
		[isAuthenticated, isLoading, navigate, isFetching]
	);

	//3. While loading, show spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	//4. If there is a user, render the app
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
