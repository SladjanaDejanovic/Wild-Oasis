import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	// closing modal by clicking somewhere outside of it
	useEffect(
		function () {
			function handleClick(e) {
				// ref.current is StyledModal, on that DOM element we can call contains method, which will return true if that element contains the element that we passed in, in this case e.target. so when clicked outside modal, e.target won't be in modal, ref.current won't contain e.target, and then modal is closed with handler (in this case it's close( we made in Modal))
				if (ref.current && !ref.current.contains(e.target)) {
					handler();
				}
			}
			// passing in 3rd argument: true, so event will be handled in capturing fase (as the event moves down the dom tree), not bubbling - to avoid bug when clicking on a button  'add new cabin' modal doesn't open bc e.target is already outside of it
			document.addEventListener(
				"click",
				handleClick,
				listenCapturing
			);

			return () =>
				document.removeEventListener(
					"click",
					handleClick,
					listenCapturing
				);
		},
		[handler, listenCapturing]
	);

	return ref;
}
