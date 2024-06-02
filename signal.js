let subscriber = null

const signal = (value) => {
    const subscribers = new Set()
    return {
        get value() {
            if (subscriber) {
                subscribers.add(subscriber)
            }
            return value
        },
        set value(newValue) {
            value = newValue
            subscribers.forEach(fn => fn())
        }
    }
}

const ref = (value) => {
    const _signal = signal(value)
    return _signal
}

const effect = (fn) => {
    subscriber = fn
    fn()
    subscriber = null
}

const computed = (fn) => {
    const compute = signal()
    effect(() => {
        compute.value = fn()
    })
    return compute
}