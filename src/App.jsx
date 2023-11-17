import { useState, useEffect } from "react";
import "./App.css";
import { Grid, CircularProgress } from "@mui/material";
import dayjsPlugin from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
dayjs.extend(dayjsPlugin);
import { useDispatch, useSelector } from "react-redux";
import { fetchRepositories } from "./services/api";
import RepoCard from "./Components/RepoCard";
import InfiniteScroll from "react-infinite-scroller";
import { setCommonFunc } from "./services/action";
import { useRef } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function App() {
  // const [page, setPage] = useState(3);
  const { height } = useWindowDimensions();
  const scrollRef = useRef(null);
  const repositories = useSelector((state) => state.repositories);
  const loader = useSelector((state) => state.loading);
  const hasMore = useSelector((state) => state.hasMore);
  const [ByDate, setByDate] = useState(
    dayjs()
      .set("date", dayjs().get("date") - 1)
      .format("YYYY-MM-DD")
  );
  const [filter, setFilter] = useState("Default");
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const scrollTobottomFunc = () => {
    scrollRef?.current?.scrollIntoView();
  }
  useEffect(() => {
    dispatch(fetchRepositories(ByDate, page));
  }, [dispatch, page, ByDate]);

  const dropdownFunc = (e) => {
    setFilter(e.target.value);
    dispatch(setCommonFunc("repositories", []));
    dispatch(setCommonFunc("page", 1));
    switch (e.target.value) {
      case "Default":
        setByDate(
          dayjs()
            .set("date", dayjs().get("date") - 1)
            .format("YYYY-MM-DD")
        );
        break;
      case "week1":
        setByDate(
          dayjs()
            .set("date", dayjs().get("date") - 7)
            .format("YYYY-MM-DD")
        );
        break;
      case "week2":
        setByDate(
          dayjs()
            .set("date", dayjs().get("date") - 14)
            .format("YYYY-MM-DD")
        );
        break;
      case "month":
        setByDate(
          dayjs()
            .set("month", dayjs().get("month") - 1)
            .format("YYYY-MM-DD")
        );
        break;
    }
  };

  return (
    repositories.length === 0 ? <Grid container justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <CircularProgress />
    </Grid> :
      <InfiniteScroll
        pageStart={page}
        loadMore={(page) => {
          console.log(page);
          dispatch(setCommonFunc("page", page));
          dispatch(setCommonFunc("hasMore", false));
          scrollTobottomFunc()
        }}
        hasMore={hasMore}
        threshold={height*.35}
      >
        <Grid container spacing={3} sx={{ padding: "2vw 5vw 0 5vw" }}>
          <Grid item xs={12}>
            <Grid container justifyContent={"flex-end"}>
              <Grid item xs={12} md={1.5}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Filter"
                    onChange={dropdownFunc}
                  >
                    <MenuItem value={"Default"}>Default</MenuItem>
                    <MenuItem value={"week1"}>last 1 week</MenuItem>
                    <MenuItem value={"week2"}>last 2 week</MenuItem>
                    <MenuItem value={"month"}>last month</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          {repositories.map((el, index) => (
            <RepoCard key={`${index}repo001`} data={{
              data: el,
              index
            }} />
          ))}

          {
            loader && <Grid container height={height*.35} justifyContent={"center"} alignItems={"center"} >
              <CircularProgress />
            </Grid>
          }
          <Grid item xs={12}>
            <div ref={scrollRef}></div>
          </Grid>
        </Grid>
      </InfiniteScroll>
  );
}

export default App;
