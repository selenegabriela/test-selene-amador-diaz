import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const AddItemScreen = () => {
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getListProduct());
    }, [ dispatch ])
    
    console.log(error)
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
                                <button>-</button>
                                <button disabled>0</button>
                                <button>+</button>
                            </div>
                            <div>
                                <label htmlFor="">{`${product.name} $${product.price}`}</label>
                            </div>
                            <div>

                            </div>
                        </div>
                    })
                }
            </div>}
            <div>
                
            </div>
        </div>
    )
}

export default AddItemScreen;