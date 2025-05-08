


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
    data: { products = [], totalPages, totalProducts } = {},
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
      alert("Produkten raderades");
      await refetch();
    } catch (error) {
      console.error("Fel vid radering av produkt", error);
      alert("Kunde inte radera produkten");
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading products: {error?.message}</div>}

      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center justify-between">
                <h3 className="font-semibold text-base text-blueGray-700">Alla produkter</h3>
              </div>
              <h3 className="my-4 text-sm">
                Visar {startProduct} till {endProduct} av {totalProducts} produkter
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nr</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Produktnamn</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Publiceringsdatum</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Redigera</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Radera</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-2 text-sm text-gray-800">{startProduct + index}</td>
                      <td className="px-6 py-2 text-sm">{product.name}</td>
                      <td className="px-6 py-2 text-sm">{formatDate(product.createdAt)}</td>
                      <td className="px-6 py-2 text-sm">
                        <Link to={`/dashboard/update-product/${product._id}`} className="text-blue-600 hover:underline">
                          Redigera
                        </Link>
                      </td>
                      <td className="px-6 py-2 text-sm">
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Radera
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Föregående
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md mx-1 ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          >
            Nästa
          </button>
        </div>
      </section>
    </>
  );
};

export default ManageProduct;
