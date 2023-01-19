import React,{Fragment,useEffect} from 'react'
import "./Dashboard.css";
import {clearerror,getdashboardstatsaction} from "../actions/statsaction"
import {useDispatch,useSelector} from "react-redux"
import Databox from './Databox';
import Linebar from './Linebar';
import Sidebar from "./Sidebar"
import { Line,Doughnut } from "react-chartjs-2";
import {ArcElement, Chart as ChartJS,Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement} from "chart.js"
ChartJS.register(ArcElement,Tooltip,LineElement,Legend,Title,CategoryScale,LinearScale,PointElement)


const Dashboard = () => {
  const dispatch=useDispatch();

  const {stats,usercount,viewcount,subscriptioncount,userpercentage,viewpercentage,subscriptionpercentage,userprofit,viewprofit,subscriptionprofit,createdAt}=useSelector((state)=>state.statsred)


  let allviews=[];
  for (let i = 0; i < stats.length; i++) {
    allviews.push(stats[i].view)
    
  }
  let labels=[];
  const months=[
    "jan",
    "feb",
    "march",
    "april",
    "may",
    "june",
    "july",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const currentmonth=new Date().getMonth();
  // const remain=11-currentmonth;
  for(let i=currentmonth; i<months.length; i--){
    let element=months[i];
    labels.unshift(element);
    if(i===0) break;
  }

  for(let i=11;i>currentmonth;i--){
    if(i===currentmonth) break;
    let element=months[i];
    labels.unshift(element);
  };
  
  

  const options={
    responsive:true,
    plugins:{
      legend:{
        position:"bottom",
      },
      title:{
        display:true,
        text:"yearly views",
      },
    },
  };
  const data={
    labels,
    datasets:[
      {
        label:"views",
        data:allviews,
        borderColor: 'rgba(107,70,193,0.5)',
        backgroundColor: '#6b46c1',
      }
    ]
  };



  let notsubscription=usercount-subscriptioncount;

  let users=[subscriptioncount,notsubscription]

  const doughnutstate={
    labels:["subscribed","not subscribed"],
    datasets:[
      {
        label:"views",
        data:users,
        borderColor: ['rgb(62,12,171)', 'rgb(214,43,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
        borderWidth: 1,
      }
    ]
  }


 


  useEffect(()=>{

    dispatch(getdashboardstatsaction())
  },[dispatch])
  return (
    <Fragment>
      <div className="sidebar"><Sidebar/></div>
      <div className="datechange">Last change was On {String(createdAt).substring(0,19)}</div>
      <h4>Dashboard</h4>

      <div className="databoxcontainer">
        <Databox title="views"
        quantity={viewcount}
        percentage={viewpercentage}
        profit={viewprofit}
        />
        <Databox
        title="users"
        quantity={usercount}
        percentage={userpercentage}
        profit={userprofit}
        />
        <Databox
        title="subscription"
        quantity={subscriptioncount}
        percentage={subscriptionpercentage}
        profit={subscriptionprofit}
        />
      </div>

      <div className="linegraphcontainer">
        

        <Line options={options} data={data}/>
      </div>

      <div className="linebarcontainer">
        <Linebar
        title="views"
        values={viewpercentage}
        profit={viewprofit}
        />
        <Linebar 
        title="user"
        values={userpercentage}
        profit={userprofit}
        />
        <Linebar 
        title="subscription"
        values={subscriptionpercentage}
        profit={subscriptionprofit}
        />

      </div>


      <div className="doughnutchartdiv">
        <Doughnut data={doughnutstate}/>
      </div>
    </Fragment>
  )
}

export default Dashboard