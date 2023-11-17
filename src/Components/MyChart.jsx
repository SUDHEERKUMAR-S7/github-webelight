import { Grid } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
export default function MyChart(props) {
    const { data,categories } = props.data;
    const options = {
        chart: {
            type: 'line'
        },
        xAxis: {
            categories,
            labels: {
              rotation: 320,
              step: 2
            },
            gridLineWidth: 1
          },
        yAxis: {
            title: {
              text: "Counts"
            },
            gridLineWidth: 1
          },
        plotOptions: {
            line: {
                legendSymbol: "rectangle",
            },
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            y: 50,
            itemMarginBottom: 30
        },
        title: {
            text: 'My chart'
        },
        series: data
    };
    return (
        <Grid container justifyContent={"center"}>
            <Grid item xs={11}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Grid>
        </Grid>
    )
}