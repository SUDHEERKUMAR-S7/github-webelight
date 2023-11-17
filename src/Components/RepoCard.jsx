import dayjs from "dayjs";
import { Avatar, Card, Chip, Grid, CircularProgress } from "@mui/material";
import Link from "@mui/material/Link";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AdjustIcon from "@mui/icons-material/Adjust";
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MyChart from "./MyChart";
import { setMapFunc } from "../services/action";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleData } from "../services/api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

console.log(dayjs.unix(1699142400).format("DD-MM-YYYY"));

export default function RepoCard(props) {
    const [toggleIcon, setToggleIcon] = useState(false);
    const { data, index } = props.data;
    const [filter, setFilter] = useState("Commits");
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const chartMap = useSelector((state) => state.chartMap);
    // console.log(chartMap,index);
    // const chartData=chartMap.get("ZachGoldberg/Startup-CTO-Handbook"+"commit_activity");
    const chartData = chartMap.get(data.full_name + "commit_activity");
    console.log(chartData);
    console.log(chartMap);
    const dropdownFunc = (e) => {
        setFilter(e.target.value);
    }
    return (
        <Grid
            item
            xs={12}
            sx={{ marginLeft: "5vw", marginRight: "5vw", textAlign: "left" }}
        >
            <Card>
                <Grid container p={1} alignItems={"center"}>
                    <Grid item md={2} xs={12}>
                        <Avatar
                            sx={{ width: "160px", height: "160px" }}
                            alt={data.full_name}
                            src={data.owner.avatar_url}
                        />
                    </Grid>
                    <Grid item md={9.4} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item sx={{ fontSize: "20px", fontWeight: "bold" }} xs={12}>
                                <Link href={data.html_url}>{data.name}</Link>
                            </Grid>
                            <Grid item xs={12}>{data.description}</Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item md={3}>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Chip
                                                    icon={<StarOutlineIcon />}
                                                    variant="outlined"
                                                    label={data.stargazers_count}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Chip
                                                    icon={<AdjustIcon />}
                                                    label={data.open_issues_count}
                                                    color="warning"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6} xs={12} display={"flex"} alignItems={"center"}>
                                        Last Pushed {dayjs(data.pushed_at).fromNow(true)} by{" "}
                                        {data.owner.login}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={0.6} xs={12}>
                        <IconButton onClick={() => {
                            if (!toggleIcon) {
                                setLoader(true)
                                // dispatch(fetchSingleData("ZachGoldberg/Startup-CTO-Handbook", "commit_activity", setToggleIcon, setLoader));
                                dispatch(fetchSingleData(data.full_name, "commit_activity", setToggleIcon, setLoader));
                            }
                            else {
                                setToggleIcon((prev) => !prev);
                            }
                        }}>
                            {toggleIcon ? <KeyboardArrowDownIcon fontSize="large" />
                                :
                                <KeyboardArrowRightIcon fontSize="large" />}
                        </IconButton>
                    </Grid>
                    {(toggleIcon && Array.isArray(chartData)) &&
                        <Grid container>
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
                                                <MenuItem value={"Commits"}>Commits</MenuItem>
                                                <MenuItem value={"Additions"}>Additions</MenuItem>
                                                <MenuItem value={"Deletions"}>Deletions</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <MyChart data={{ data: [{name:"Commit",data:chartData.map((el) => (el.total))}], categories: chartData.map((el) => dayjs.unix(el.week).format("DD-MM-YYYY")) }} />
                            </Grid>
                        </Grid>
                    }
                    {
                        toggleIcon && !Array.isArray(chartData) && <Grid container height={300} justifyContent={"center"} alignItems={"center"} >
                            <Grid item fontSize={18} fontWeight={"bold"}>No Data Found</Grid>
                        </Grid>
                    }
                    {
                        loader && <Grid container height={300} justifyContent={"center"} alignItems={"center"} >
                            <CircularProgress />
                        </Grid>
                    }
                </Grid>
            </Card>
        </Grid>
    )
}