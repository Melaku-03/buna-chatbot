const variants = (direction) => {
    return {
        hidden: {
            x: direction < 0 ? -300 : 300,
        },
        fadeIn: {
            y: 0,
            x: 0,
            // opacity: 1,
            transition: {
                type: 'tween',
                ease: [.25, .25, .25, .75]
            }
        },
        fadeOut: () => ({
            x: direction < 0 ? -300 : 300,
            // opacity: 0
        })

    }
}

export default variants;
