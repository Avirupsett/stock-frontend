import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Button } from "@mui/material";

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});


export default function Datatable() {
    const [values, setValues] = useState([])

    async function fetchData() {
        const axios = require("axios");
        let value1 = []
        let value2 = []
        let value3 = []
        let url1 = "http://localhost:1337/stock-entries"
        let url2 = "http://localhost:1337/stock-issues"
        let url3 = "http://localhost:1337/products"

        try{
        axios.get(url1).then(async (response) => {
            value1 = await response.data
            axios.get(url2).then(async (response) => {
                value2 = await response.data;
                axios.get(url3).then(async (response) => {
                    value3 = await response.data;
                   // console.log(value1)
                    let allsum=[]
                    for (let i = 0; i < value3.length; i++) {
                        let sum = 0
                        for (let j = 0; j < value1.length; j++) {
                            if (value3[i].Name === value1[j].Product.Name) {
                                sum += value1[j].Quantity
                            }
                        }
                        allsum.push(sum)
                    }
                    
                    for (let i = 0; i < value3.length; i++) {
                        let diff = 0
                        
                        for (let j = 0; j < value2.length; j++) {
                            if (value3[i].Name === value2[j].Product.Name) {
                                diff =allsum[i]-value2[j].Quantity
                                allsum[i]=diff
                            }
                        }
                        
                    }
                    
                    let value = []
                    for (let i = 0; i < value3.length; i++) {
                        value.push([value3[i].Name,allsum[i]])
                    }
                    setValues(value.sort())
                })
            })

        });
    }catch(e){
        console.log(e)
    }
    }
    var prevalue1=[]
    var prevalue2=[]
    var prevalue3=[]

    async function autorefresh() {
        const axios = require("axios");
        let value1 = []
        let value2 = []
        let value3 = []
        let url1 = "http://localhost:1337/stock-entries"
        let url2 = "http://localhost:1337/stock-issues"
        let url3 = "http://localhost:1337/products"

        try{
        axios.get(url1).then(async (response) => {
            value1 = await response.data
            axios.get(url2).then(async (response) => {
                value2 = await response.data;
                axios.get(url3).then(async (response) => {
                    value3 = await response.data;
                    if(value1!==prevalue1||value2!==prevalue2||value3!==prevalue3){
                        prevalue1=value1
                        prevalue2=value2
                        prevalue3=value3
                        await fetchData()
                    }
                })
            })

        });
    }
    catch(e){
        console.log(e)
    }

    }
    useEffect(() => {
        //eslint-disable-next-line
        setTimeout(async() => {
        await fetchData(); 
       // fetch()
       setInterval(async() => {
              await autorefresh()
           }, 60000);
        },100)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
   )
    const responsive = "standard";
    const tableBodyHeight = "";
    const tableBodyMaxHeight = "";
    const searchBtn = true;
    const downloadBtn = true;
    const printBtn = true;
    const viewColumnBtn = true;
    const filterBtn = true;

    const columns = [
        { name: "PRODUCT NAME", options: { filterOptions: { fullWidth: true },
     
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",textAlign:'center',paddingRight:'80px',fontSize:18,backgroundColor:'#a353ff',letterSpacing:'1.5px',color:'#fff',fontFamily:'Montserrat',fontWeight:550 }}),
        setCellHeaderProps: () => ({ style: { textAlign:'center',paddingRight:'80px',fontSize:20,fontWeight:1000,borderTop:'1px solid',height:'65px',letterSpacing:'2px',borderColor:'#594e8e',backgroundColor:'#3A3260',color:'#fff',borderRight:'1px solid',fontFamily:'Montserrat'}}),
        sort:false   } },
      
        { name:"PRODUCT QUANTITY", options: { filterOptions: { fullWidth: true },
     
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",textAlign:'center',fontSize:18,backgroundColor:'#dc5bbc',letterSpacing:'2px',color:'#fff',fontFamily:'Montserrat',fontWeight:550 }}),
        setCellHeaderProps: () => ({ style: { textAlign:'center',fontSize:20,fontWeight:1000,borderTop:'1px solid',height:'65px',borderColor:'#594e8e',letterSpacing:'2px',backgroundColor:'#3A3260',color:'#fff',borderLeft:'1px solid',fontFamily:'Montserrat'}}),
        sort:false   } },
        
    ];

    const options = {
        customToolbar: () => {
            return (
              <Button style={{border:'1px solid'}} onClick={async()=>await fetchData()}>Refresh</Button>
            );
          },
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        selectableRows: "none",
        // onTableChange: (action, state) => {
        //     console.log(action);
        //     console.dir(state);
        // }
    };

   

    return (
        <div style={{marginTop:'70px'}}>
        <CacheProvider value={muiCache}>
            <ThemeProvider theme={createTheme()}>

                <MUIDataTable
                    title={"STOCK BALANCE"}
                    data={values}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </CacheProvider>
        </div>
    );
}


