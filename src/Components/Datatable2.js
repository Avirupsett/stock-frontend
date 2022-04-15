import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// import { Button } from "@mui/material";
import loading from '../assets/loading.gif';
import reflogo from '../assets/refresh.png';

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
        //let value3 = []
         // let url1 = "http://localhost:1337/stock-entries"
        // let url2 = "http://localhost:1337/stock-issues"
        // let url3 = "http://localhost:1337/products"
        let url1 = "https://inventorybackend123.herokuapp.com/stock-entries"
        let url2 = "https://inventorybackend123.herokuapp.com/stock-issues"
        // let url3 = "https://inventorybackend123.herokuapp.com/products"


        try{
        axios.get(url1).then(async (response) => {
            value1 = await response.data
            axios.get(url2).then(async (response) => {
                value2 = await response.data;
                    // console.log(value1)
                    let allsum=[]
                    for (let i = 0; i < value2.length; i++) {
                        let sum = 0
            
                        for (let j = 0; j < value2.length; j++) {
                            if (new Date(value2[j].Date) <= new Date(value2[i].Date) && value2[i].Product.Name=== value2[j].Product.Name) {
                                sum += value2[j].Quantity
                            }
                        }
                        allsum.push(sum)
                    }
                   
                    let alldiff=[]
                    for (let i = 0; i < value2.length; i++) {
                        let diff = 0
                        
                        for (let j = 0; j < value1.length; j++) {
                            if (new Date(value1[j].Date) <= new Date(value2[i].Date) && value2[i].Product.Name=== value1[j].Product.Name) {
                                diff +=value1[j].Quantity
                            }
                        }
                        alldiff.push(diff-allsum[i])
                        
                    }

                    
                    let value = []
                    for (let i = 0; i < value2.length; i++) {
                        value.push([`${(new Date(value2[i].Date)).toDateString()}`,value2[i].Person_Name,value2[i].Product.Name,value2[i].Quantity,"_",alldiff[i]])
                    }
                   // console.log(value.reverse())
                    
                    let allsum2=[]
                    for (let i = 0; i < value1.length; i++) {
                        let sum = 0
                        
                        for (let j = 0; j < value1.length; j++) {
                            if (new Date(value1[j].Date) <= new Date(value1[i].Date) && value1[i].Product.Name=== value1[j].Product.Name) {
                                sum += value1[j].Quantity
                            }
                        }
                        allsum2.push(sum)
                    }
                   
                    let alldiff2=[]
                    for (let i = 0; i < value1.length; i++) {
                        let diff = 0
                        
                        for (let j = 0; j < value2.length; j++) {
                            if (new Date(value2[j].Date) <= new Date(value1[i].Date) && value1[i].Product.Name === value2[j].Product.Name) {
                                diff +=value2[j].Quantity
                            }
                        }
                        alldiff2.push(allsum2[i]-diff)
                        
                    }
                    console.log(alldiff2)
                    for (let i = 0; i < value1.length; i++) {
                        value.push([`${(new Date(value1[i].Date)).toDateString()}`,"✪✪ ENTRY ✪✪",value1[i].Product.Name,"_",value1[i].Quantity,alldiff2[i]])
                    }
                    value.sort(function(a, b){return new Date(a[0]) - new Date(b[0])});
                    setValues(value.reverse())
                })
            });

        
    }catch(e){
        console.log(e)
    }
    }
    var prevalue1=[]
    var prevalue2=[]

    async function autorefresh() {
        const axios = require("axios");
        let value1 = []
        let value2 = []
       // let value3 = []
         // let url1 = "http://localhost:1337/stock-entries"
        // let url2 = "http://localhost:1337/stock-issues"
        // let url3 = "http://localhost:1337/products"
        let url1 = "https://inventorybackend123.herokuapp.com/stock-entries"
        let url2 = "https://inventorybackend123.herokuapp.com/stock-issues"
        // let url3 = "https://inventorybackend123.herokuapp.com/products"

        try{
        axios.get(url1).then(async (response) => {
            value1 = await response.data
            axios.get(url2).then(async (response) => {
                value2 = await response.data;
                
                    if(value1!==prevalue1||value2!==prevalue2){
                        prevalue1=value1
                        prevalue2=value2
                        await fetchData()
                    }
                })

        });
        }catch(e){
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

    const columns = [{name: "DATE" , options: { 
     
    setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",textAlign:'center',fontSize:18,backgroundColor:'#8b50ce',letterSpacing:'1.5px',color:'#fff',fontFamily:'Montserrat',fontWeight:500 }}),
    setCellHeaderProps: () => ({ style: { textAlign:'center',fontSize:19,fontWeight:600,letterSpacing:'2px',borderRight:`2px solid #594e8e`,borderLeft:`2px solid #594e8e`,borderBottom:`2px solid #3A3260`,height:'65px',backgroundColor:'#3A3260',color:'#fff',fontFamily:'Montserrat'}}),
    sort:false  } }, 
        {name: "PERSON NAME",options: { filterOptions: { fullWidth: true },
     
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",textAlign:'left',fontSize:18,backgroundColor:'#a353ff',letterSpacing:'1.5px',color:'#fff',fontFamily:'Montserrat',fontWeight:500 }}),
        setCellHeaderProps: () => ({ style: { textAlign:'center',fontSize:19,fontWeight:600,letterSpacing:'2px',borderRight:`2px solid #594e8e`,borderLeft:`2px solid #594e8e`,borderBottom:`2px solid #3A3260`,height:'65px',backgroundColor:'#3A3260',color:'#fff',fontFamily:'Montserrat'}}),
        sort:false  }},
        { name: "PRODUCT NAME", options: { filterOptions: { fullWidth: true },
     
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",textAlign:'left',fontSize:18,backgroundColor:'#dc5bbc',letterSpacing:'1.5px',color:'#fff',fontFamily:'Montserrat',fontWeight:500 }}),
        setCellHeaderProps: () => ({ style: { textAlign:'center',fontSize:19,fontWeight:600,letterSpacing:'2px',borderRight:`2px solid #594e8e`,borderLeft:`2px solid #594e8e`,borderBottom:`2px solid #3A3260`,height:'65px',backgroundColor:'#3A3260',color:'#fff',fontFamily:'Montserrat'}}),
        sort:false   } },
      
        { name:"ISSUE QUANTITY", options: {
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",textAlign:'center',fontSize:18,backgroundColor:'#d94b95',letterSpacing:'2px',color:'#fff',fontFamily:'Montserrat',fontWeight:500 }}),
        setCellHeaderProps: () => ({ style: { textAlign:'center',fontSize:19,fontWeight:600,letterSpacing:'2px',borderRight:`2px solid #594e8e`,borderLeft:`2px solid #594e8e`,borderBottom:`2px solid #3A3260`,height:'65px',backgroundColor:'#3A3260',color:'#fff',fontFamily:'Montserrat'}}),
        sort:false   } },
        { name:"ENTRY QUANTITY", options: {
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",textAlign:'center',fontSize:18,backgroundColor:'#d96176',letterSpacing:'2px',color:'#fff',fontFamily:'Montserrat',fontWeight:500 }}),
        setCellHeaderProps: () => ({ style: { textAlign:'center',fontSize:19,fontWeight:600,letterSpacing:'2px',borderRight:`2px solid #594e8e`,borderLeft:`2px solid #594e8e`,borderBottom:`2px solid #3A3260`,height:'65px',backgroundColor:'#3A3260',color:'#fff',fontFamily:'Montserrat'}}),
        sort:false   } },
        { name:"BALANCE",options: { 
     
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",textAlign:'center',fontSize:18,backgroundColor:'#d94461',letterSpacing:'1.5px',color:'#fff',fontFamily:'Montserrat',fontWeight:500 }}),
        setCellHeaderProps: () => ({ style: { textAlign:'center',fontSize:19,fontWeight:600,letterSpacing:'2px',borderRight:`2px solid #594e8e`,borderLeft:`2px solid #594e8e`,borderBottom:`2px solid #3A3260`,height:'65px',backgroundColor:'#3A3260',color:'#fff',fontFamily:'Montserrat'}}),
        sort:false   } }
        
    ];
  
    const options = {
        customToolbar: () => {
            return (
                <img src={reflogo} alt="Refresh" style={{ width: "20px", height: "20px",marginLeft:'5px',cursor:'pointer',marginBottom:'1px' }} />
             // <Button style={{border:'1px solid #3A3260',marginBottom:'5px',color:'#3A3260',fontWeight:550}} onClick={async()=>await fetchData()}>Refresh</Button>
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
                    title={""}
                    data={values}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </CacheProvider>
        {values.length===0 &&
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'5px'}}>
        <img src={loading} alt="loading.."/>
        </div>}
        </div>
    );
}


