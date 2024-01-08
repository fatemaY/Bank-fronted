import React from 'react'
import Card from '../components/Card'

const Home = () => {
  return (
        <Card
            bgcolor="primary"
            txtcolor="white"
            header="FullStack Bank"
            title="Welcome to FullStack Bank"
            text="You are not secure"
            body={(<img src="bank.png"  className="img-bank" alt="Responsive image"/>)}
        />
    
  )
}

export default Home

