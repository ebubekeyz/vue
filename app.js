let app = Vue.createApp({
    props: ['cart', 'inventory', 'remove'],
    data: function(){
        return {
            show: false,
            visible: false,
            mainhead: 'Menu List',
            modal: false,
            modal2: false,
            modal3: false,
            inventory: [],
            cart: {}

        }
    },
    computed: {
        totalQuantity(){
            return Object.values(this.cart).reduce((acc, curr) => {
                return acc + curr
            }, 0)
        }
    },
    methods: {
        toggler(){
            this.show = !this.show
        },
        visibletoggler(){
            this.visible = !this.visible
        },
        modetoggle(){
            this.modal = !this.modal
        },
        mode2toggle(){
            this.modal2 = !this.modal2
        },
        mode3toggle(){
            this.modal3 = !this.modal3
        },
        addToCart(name, index){
            if(!this.cart[name]) this.cart[name] = 0
            this.cart[name] += this.inventory[index].quantity
            this.inventory[index].quantity = 0
            
        },
        getPrice(name){
            const product = this.inventory.find((p) => {
                return p.name === name
            })
            return (product.price.USD).toFixed(2)
        },
        calculateTotal(){
            
            const total = Object.entries(this.cart).reduce((acc, curr, index) => {
                return acc + (curr[1] * this.getPrice(curr[0]))
            }, 0)
            return total.toFixed(2)
        },
        removeItem(name){
            delete this.cart[name]
        }
    },
    async mounted(){
        const res = await fetch('food.json')
        const data = await res.json()
        this.inventory = data
    }
})



   


app.mount('#app')