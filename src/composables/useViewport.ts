import {onMounted, onUnmounted, ref} from 'vue'

export const useViewport = () => {
	// Skip if not in browser environment
	if (typeof window === 'undefined') {
		return {
			windowWidth: ref(1920),
			windowHeight: ref(1080)
		}
	}

	const windowWidth = ref(window.innerWidth)
	const windowHeight = ref(window.innerHeight)

	const updateWindowSize = () => {
		windowWidth.value = window.innerWidth
		windowHeight.value = window.innerHeight
	}

	onMounted(() => {
		updateWindowSize()
		window.addEventListener('resize', updateWindowSize)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', updateWindowSize)
	})

	return {
		windowWidth,
		windowHeight
	}
}
