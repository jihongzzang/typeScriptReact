import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';

interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;
  __v: number;
}

interface Response {
  totalPages: number;
  totlaPassengers: number;
  data: Array<Passenger>;
}

function PaginationExample() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState<Array<Passenger>>([]);

  const handlePageChange = (currentPage: number): void => {
    setPage(currentPage);
  };

  console.log(page);

  useEffect(() => {
    const fetch = async () => {
      const params = { page, size: 10 };

      const {
        data: { totalPages, data },
      } = await axios.get<Response>(
        'https://api.instantwebtools.net/v1/passenger',
        {
          params,
        },
      );

      setTotalPages(totalPages);
      setItems(data);
    };
    fetch();
  }, [page]);

  return (
    <>
      <ul>
        {items.map((item) => {
          return <li key={item._id}>{item.name}</li>;
        })}
      </ul>
      <Pagination
        count={totalPages}
        page={page}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default PaginationExample;
