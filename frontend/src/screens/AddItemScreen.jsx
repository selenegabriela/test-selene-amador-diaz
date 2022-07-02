import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const AddItemScreen = () => {

    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ render, setRender ] = useState(0);
    const [ discount, setDiscount ] = useState(0);
    const [ cart, setCart ] = useState([]);
    const [ iva, setIva] = useState(0);
    const [ finalPrice, setFinalPrice ] = useState(0);
    
    let sum = 0;
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getListProduct());
    }, [ dispatch ]);
    useEffect(() => {
        cart.forEach(p => sum += p.price*p.qty);
        setDiscount(((sum*10)-(totalPrice*10))/10);
        setIva(totalPrice*.16);
        setFinalPrice(totalPrice+iva);      
    }, [sum, cart, discount, totalPrice, render]);
    
    const handleClick = (e, product) => {

        
        if(e.target.id === 'minus' && product.qty > 0){
            product.qty -= 1;
            if(product.qty === 0){
                setCart(cart.filter(p => p.name !== product.name))
            }
            if(product.code === 'TermSheet' && product.qty >= 2){
                if(product.qty === 2){
                    setTotalPrice(prevState => (prevState - (100*3)) + product.price*2);
                } else if(product.qty>2){
                    setTotalPrice(prevState => (prevState - 100));
                }
            } else if(product.code === 'Nda'){
                // console.log(product.qty)
                if(product.qty % 2 === 0){
                    setTotalPrice(prevState => prevState -= product.price)
                } else {
                    setRender(render+1);
                    return
                }
            } else {
                setTotalPrice(prevState => prevState = ((prevState*10) - (product.price * 10)) / 10)
            }
            
        } 
        
        if(e.target.id === 'plus'){
            const some = cart.some(p => p.name === product.name)
            product.qty += 1;
            if(!some){
                setCart(prevState => [...prevState, product] )
            }
            if(product.code === 'TermSheet' && product.qty >= 3){
                // console.log(totalPrice, product.qty, product.price)
                if(product.qty === 3){
                    setTotalPrice(prevState => ((prevState - ((product.qty-1) * product.price))) + product.qty*100);
                } else {
                    setTotalPrice(prevState => ((prevState - ((product.qty-1) * 100))) + product.qty*100);
                }
            } else if(product.code === 'Nda'){
                // console.log(product.qty)
                if(product.qty % 2 !== 0){
                    setTotalPrice(prevState => prevState += product.price)
                } else {
                    setRender(render+1);
                    return
                }
            } else {
                setTotalPrice(prevState => prevState = ((prevState*10) + (product.price * 10)) / 10)
            }
        }
        
        
    }
    
    return (
        <div>
            <div>    
                <h3>Selecciona todos los contratos que necesitas: </h3>
                <label>Elige todos los documentos que necesitas y realiza tu pago. Contéstalos y descárgalos cuando los necesites.</label>
            </div>
            {
                loading ?
                <LoadingBox></LoadingBox> :
                error ?
                <MessageBox>{error.message}</MessageBox> :
                
            
            <div>
                {
                    products.map(product => {
                        return <div key={product.code}>
                            <div>
                                <button id='minus' onClick={e => handleClick(e, product)}>-</button>
                                <button disabled>{product.qty}</button>
                                <button id='plus' onClick={e => handleClick(e, product)}>+</button>
                            </div>
                            <div>
                                <label htmlFor="">{product.name}</label>
                            </div>
                            <div>

                            </div>
                        </div>
                    })
                }
            </div>}
            <div>
            {
                cart.map(product => {
                    return <div key={product.code}>
                        <label htmlFor="">{`${product.qty} ${(product.code === 'TermSheet' && product.qty >=3) 
                        ? product.qty*100 : (product.code === 'Nda') 
                        ? (product.qty % 2 !== 0) 
                        ? (Math.ceil(product.qty/2)*product.price) : (Math.floor(product.qty/2)*product.price) 
                        : product.price*product.qty} `}</label> <br />
                    </div>
                })
            }
            <div>
                <label htmlFor="">Subtotal ${totalPrice}</label> <br />
                <label htmlFor="">Descuento ${discount}</label> <br />
                <label htmlFor="">IVA ${iva}</label><br />
                <label htmlFor="">Total ${finalPrice}</label>
            </div>
                
            </div>
        </div>
    )
}

export default AddItemScreen;