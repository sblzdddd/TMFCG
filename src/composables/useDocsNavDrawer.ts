import {ref} from 'vue'

const DOCS_NAV_DRAWER_STATE_SYMBOL = 'docsNavDrawerState'
const isOpen = ref(false)

export const useDocsNavDrawer = () => {
	// Skip if not in browser environment
	if (typeof window === 'undefined') {
		return {
			isOpen: ref(false),
		}
	}

	provide(DOCS_NAV_DRAWER_STATE_SYMBOL, isOpen);


	const toggle = () => {
		isOpen.value = !isOpen.value
	}

	return {
		isOpen,
		toggle
	}
}
