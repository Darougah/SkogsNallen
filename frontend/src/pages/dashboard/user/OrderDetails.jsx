import React from 'react'

import { useParams } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../../../redux/features/orders/orderApi';
import { TimelineStep } from '../../../components/TimelineStep';

function OrderDetails() {
const {orderId} = useParams()
const {data : order, error , isLoading} = useGetOrderByIdQuery(orderId)
// console.log(order);
if(isLoading) return <div>Loading...</div>
if(error) return <div>No orders!</div>

const isCompleted = (status)=>{
  const statuses =["Mottagen", "Behandlas", "Skickad", "Klar"];
  return statuses.indexOf(status) < statuses.indexOf(order.status)
  }
  
  const isCurrent = (status) => order.status ===status;
  const steps = [
    {
      status: 'Mottagen',
      label: 'Mottagen',
      description: 'Din beställning har tagits emot.',
      icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
    },
    {
      status: 'Behandlas',
      label: 'Behandlas',
      description: 'Din beställning behandlas just nu.',
      icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
    },
    {
      status: 'Skickad',
      label: 'Skickad',
      description: 'Din beställning har skickats.',
      icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
    },
    {
      status: 'Klar',
      label: 'Klar',
      description: 'Din beställning är slutförd.',
      icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
    },
  ];

  return (
        <section className='section__container rounded p-6'>
          <h2 className='text-2xl font-semibold mb-4'>Payment {order?.status}</h2>
          <p className='mb-4'>Order Id:{order?.orderId}</p>
          <p className='mb-4'>Status:{order?.status}</p>
    
          <ol className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center w-full relative mt-6 border-t sm:border-t-0 sm:border-l-0">
      {steps.map((step, index) => (
        <TimelineStep
          key={index}
          step={step}
          order={order}
          isCompleted={isCompleted(step.status)}
          isCurrent={isCurrent(step.status)}
          isLastStep={index === steps.length - 1}
          icon={step.icon}
          description={step.description}
        />
      ))}
    </ol>
    
          </section>
  )
}

export default OrderDetails