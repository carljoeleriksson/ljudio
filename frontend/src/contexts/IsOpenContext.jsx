// CONTEXT USED FOR THE BURGER MENU
import React, { useState, createContext } from 'react'

export const IsOpenContext = createContext();

function IsOpenContextProvider(props) {
	const [menuOpenState, setMenuOpenState] = useState(false)



	return (
		<div>
			<IsOpenContext.Provider value={{
				isMenuOpen: menuOpenState,
      			toggleMenu: () => setMenuOpenState(!menuOpenState),
      			stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen)
			}}>
				{props.children}
			</IsOpenContext.Provider>
		</div>
	)
}

export default IsOpenContextProvider
