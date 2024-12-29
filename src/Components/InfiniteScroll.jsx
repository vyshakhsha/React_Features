import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../assets/Styles/filter.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export default function InfiniteScrollCmp() {
  const apiUrlMovies = import.meta.env.VITE_MOVIES;
  const [movieData, setMovieData] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Tracks if more movies are available

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(apiUrlMovies, {
        params: {
          api_key: "2c1bc78e12e575f860f6e2bcc767ef52",
          page: page,
        },
      });
      if (response) {
        if (movieData) {
          setMovieData((prev) => [...prev, ...response.data.results]);
        } else {
          setMovieData(response.data.results);
        }
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={Array.isArray(movieData) ? movieData.length : 0}
      next={fetchMovieData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>You have seen all the movies!</p>
      }
    >
      <Box sx={{ minWidth: 120 }}>
        <h2>Infinite Scrolling</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Description
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Release Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Rating
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movieData
                ? movieData.map((movie, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {movie.title}
                      </TableCell>
                      <TableCell align="left">
                        {movie.overview.length > 100
                          ? movie.overview.slice(0, 100) + "..."
                          : movie.overview}
                      </TableCell>
                      <TableCell align="right">{movie.release_date}</TableCell>
                      <TableCell align="right">{movie.vote_average}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </InfiniteScroll>
  );
}
