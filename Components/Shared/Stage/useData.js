import { create } from 'zustand';

const useData = create((set) => ({
    // Get Basket
    basket: {
        positions: [],
        allSum: 0,
    },
    // Add Basket New Object
    setBasket: (newBasket) => set(state => ({ basket: newBasket })),

    // ----------------------------------------------------------------------------

    // Get Product
    products: null,

    // Add Basket New Object
    setProducts: (newProducts) => set(state => ({ products: newProducts })),

    // ----------------------------------------------------------------------------

    // Get tail
    tail: null,

    // Add tail new object
    setTail: (newTail) => set(state => ({ tail: newTail })),

    // inputName state I created for my own keyboard

    focusedInput: null,

    setFocusedInput: (inputName) => set({ focusedInput: inputName }),

    inputValues: {
        login: "",
        password: "",
        adminLogin: "",
        adminPassword: "",
        productsSearch: "",
        cashIn: 0,
        cashOut: 0,
        editPrice: "",
        customerPrice: "",
        salesSearch: ""
    },

    setInputValue: (inputName, value) =>
        set((state) => ({
            inputValues: { ...state.inputValues, [inputName]: value },
        })),

    // Keyboard modam answer
    keyModal: false,
    setKeyModal: (answer) => set({ keyModal: answer }),

    // localdata
    localProduct: [],
    setLocalProduct: (answer) => set({ localProduct: answer }),



    // Count
    cloudCount: 0,
    setCloudCount: (count) => set((state) => ({ cloudCount: count })),
    cloudIncreases: (count) => set((state) => ({ cloudCount: state.cloudCount + 1 })),
    cloudReduce: (count) => set((state) => ({ cloudCount: state.cloudCount - 1 }))
}))

export default useData;