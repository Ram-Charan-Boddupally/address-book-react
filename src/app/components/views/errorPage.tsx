import React from 'react'
import '../../../styles/pageNotFoundStyles.css'

export default class Error404 extends React.Component<{},{}>{
    constructor(props:{}){
        super(props)
    }

    render(): React.ReactNode {
        return(
            <div className='error-page'>
                <h1>ERROR 404</h1>
                <p>PAGE NOT FOUND</p>
            </div>
        )
    }
}