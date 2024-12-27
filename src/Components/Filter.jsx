import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../assets/Styles/filter.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Filter() {
  const apiUrlMovies = import.meta.env.VITE_MOVIES;
  const [movieData, setMovieData] = useState(null);
  const [page, setPage] = useState(1);
  const [sortItem, setSortItem] = React.useState("");
  const [filterItem, setFilterItem] = React.useState("");
  const [searchItem, setSearchItem] = React.useState("");
  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await axios.get(apiUrlMovies, {
        params: {
          api_key: "2c1bc78e12e575f860f6e2bcc767ef52",
          page: page,
        },
      });
      if (response) {
        setMovieData(response.data.results);
        let sortedData = response.data.results;
        if (sortItem != "") {
          if (sortItem === "rel-asc") {
            sortedData = sortedData.sort(
              (a, b) => new Date(a.release_date)- new Date(b.release_date)
            );
          } else if (sortItem === "rel-dsc") {
            sortedData = sortedData.sort(
              (a, b) => new Date(b.release_date)- new Date(a.release_date)
            );
          } else if (sortItem === "rat-asc") {
            sortedData = sortedData.sort(
              (a, b) => a.vote_average - b.vote_average
            );
          } else if (sortItem === "rat-dsc") {
            sortedData = sortedData.sort(
              (a, b) => b.vote_average - a.vote_average
            );
          }
          setMovieData(sortedData);
        }
        if(filterItem!=""){
          let filteredData=response.data.results;
          if(filterItem===5){
            filteredData=filteredData.filter((movie)=>movie.vote_average<filterItem)
          }
          else{
            filteredData=filteredData.filter((movie)=>movie.vote_average>filterItem)
          }
          setMovieData(filteredData)
        }
        if(searchItem!=""){
          let searchedData=response.data.results;
          searchedData=searchedData.filter((movie)=>movie.title.toLowerCase().includes(searchItem.toLowerCase()))
          setMovieData(searchedData)
        }
      }
    };
    fetchMovieData();
  }, [apiUrlMovies, page, sortItem,filterItem,searchItem]);

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    page > 1 ? setPage(page - 1) : null;
  };
  const handleSortChange = (event) => {
    setSortItem(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterItem(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <h2>Trending Movies</h2>
      <FormControl sx={{ width: "200px", margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortItem}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value={"rel-asc"}>Release Date Asc</MenuItem>
          <MenuItem value={"rel-dsc"}>Release Date Desc</MenuItem>
          <MenuItem value={"rat-asc"}>Rating Asc</MenuItem>
          <MenuItem value={"rat-dsc"}>Rating Desc</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: "200px", margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterItem}
          label="Filter By"
          onChange={handleFilterChange}
        >
          <MenuItem value={9}>Above 9</MenuItem>
          <MenuItem value={8}>Above 8</MenuItem>
          <MenuItem value={7}>Above 7</MenuItem>
          <MenuItem value={6}>Above 6</MenuItem>
          <MenuItem value={5}>Below 6</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: "200px", margin: "20px" }}>
      <TextField id="outlined-basic" label="Movie name" onChange={(event)=>setSearchItem(event.target.value)} variant="outlined" />
      </FormControl>

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
                    <TableCell align="right">
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
      <button onClick={prevPage}>Previous Page</button>
      <button onClick={nextPage}>Next Page</button>
    </Box>
  );
}
