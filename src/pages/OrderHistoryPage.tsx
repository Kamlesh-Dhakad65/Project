import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import { useGetOrderHistoryQuery } from '../hooks/orderHooks';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';


// Function to generate invoice content based on order details
function generateInvoice(order: { _id: any; createdAt: string; totalPrice: number; isPaid: any; paidAt: string; isDelivered: any; deliveredAt: string; }) {
  // Create a string representing the invoice content
  const invoiceContent = `
    Order ID: ${order._id}
    Date: ${order.createdAt.substring(0, 10)}
    Total: ${order.totalPrice.toFixed(2)}
    Paid: ${order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
    Delivered: ${order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}
  `;
  return invoiceContent;
}

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery();

  // Function to handle invoice download
  const handleDownloadInvoice = (order: { _id: any; createdAt: string; totalPrice: number; isPaid: any; paidAt: string; isDelivered: any; deliveredAt: string; }) => {
    // Generate invoice content
    const invoiceContent = generateInvoice(order);
    // Create a Blob containing the invoice content
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);
    // Create a link element
    const link = document.createElement('a');
    // Set link attributes
    link.href = url;
    link.setAttribute('download', `invoice_${order._id}.txt`);
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>Order History</h1>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders!.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleDownloadInvoice(order)}
                  >
                    Download Invoice
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
