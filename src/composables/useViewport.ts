import {ref} from 'vue'

const windowWidth = ref(1024)
const windowHeight = ref(768)
const breakpoint = ref("lg")

// Breakpoint prefix	Minimum width	CSS
// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }

export const useViewport = () => {
	// Skip if not in browser environment
	if (typeof window === 'undefined') {
		return {
			windowWidth: ref(1024),
			windowHeight: ref(768),
			breakpoint: ref("lg")
		}
	}

	const updateBreakpoint = () => {
		if (window.innerWidth < 640) {
			breakpoint.value = "sm"
		} else if (window.innerWidth < 768) {
			breakpoint.value = "md"
		} else if (window.innerWidth < 1024) {
			breakpoint.value = "lg"
		} else if (window.innerWidth < 1280) {
			breakpoint.value = "xl"
		} else {
			breakpoint.value = "2xl"
		}
	}

	const updateWindowSize = () => {
		windowWidth.value = window.innerWidth
		windowHeight.value = window.innerHeight
		updateBreakpoint()
	}

	// Initialize values
	updateWindowSize()

	window.removeEventListener('resize', updateWindowSize)
	window.addEventListener('resize', updateWindowSize)

	return {
		windowWidth,
		windowHeight,
		breakpoint
	}
}
