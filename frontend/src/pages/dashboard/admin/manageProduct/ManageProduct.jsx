import React, { useState } from 'react';
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('sv-SE');
};

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const {
    data: { products = [], totalPages = 1, totalProducts = 0 } = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchAllProductsQuery({
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    page: currentPage,
    limit: productsPerPage,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct({ id }).unwrap();
      alert('Produkten raderades');
      await refetch();
    } catch (error) {
      console.error('Fel vid radering av produkt', error);
      alert('Kunde inte radera produkten');
    }
  };

  return (
    <section className="py-6">
      {isLoading && <div className="text-center py-4">Laddar produkter...</div>}
      {isError && <div className="text-center text-red-500 py-4">Fel: {error?.message}</div>}

      <div className="w-full px-4 mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="font-semibold text-lg text-gray-800">Alla produkter</h3>
            <p className="text-sm mt-2 sm:mt-0 text-gray-600">
              Visar {startProduct} till {endProduct} av {totalProducts} produkter
            </p>
          </div>
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-50 text-gray-700 font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left">Nr</th>
                  <th className="px-6 py-3 text-left">Produktnamn</th>
                  <th className="px-6 py-3 text-left">Publiceringsdatum</th>
                  <th className="px-6 py-3 text-left">Redigera</th>
                  <th className="px-6 py-3 text-left">Radera</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{startProduct + index}</td>
                    <td className="px-6 py-3 truncate max-w-[200px]" title={product.name}>{product.name}</td>
                    <td className="px-6 py-3">{formatDate(product.createdAt)}</td>
                    <td className="px-6 py-3">
                      <Link to={`/dashboard/update-product/${product._id}`} className="text-blue-600 hover:underline">
                        Redigera
                      </Link>
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Radera
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block sm:hidden p-4 space-y-4">
            {products.map((product, index) => (
              <div key={product._id} className="border rounded-lg p-4 shadow-sm">
                <p className="text-sm"><span className="font-semibold">Nr:</span> {startProduct + index}</p>
                <p className="text-sm"><span className="font-semibold">Namn:</span> <span title={product.name} className="block truncate">{product.name}</span></p>
                <p className="text-sm"><span className="font-semibold">Publicerad:</span> {formatDate(product.createdAt)}</p>
                <div className="flex gap-4 mt-2">
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="text-blue-600 font-medium hover:underline text-sm"
                  >
                    Redigera
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    Radera
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Föregående
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Nästa
        </button>
      </div>
    </section>
  );
};

export default ManageProduct;
