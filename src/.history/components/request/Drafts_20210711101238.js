import React, { useEffect, useState } from "react";
import BookingService from "../../service/BookingService";
import { Card, CardHeader, InputLabel,  makeStyles,withStyles,Grid,useStyles ,IconButton} from "@material-ui/core/";
import { useHistory } from "react-router-dom";



function Drafts() {
  const [draftList,setDraftList]=useState([]);
  const [showToaster,setShowToaster]=useState("NOTOASTER");
  const [render,setRender]=useState(0);

  const LabelData = withStyles((theme) => ({
    root: {
           fontSize:'16px',
           color:'#848484',
           fontFamily: "Dubai Medium",
           marginLeft:"10px",
           marginTop:"20px"
         
         
    
  
    },
  
    
    
   })
  
  )(InputLabel);

  const activeStepMap=new Map([["Enter Drop Location Details" , 1], ["Complete Payment" ,2] ]);

  let history = useHistory();
 

  
  useEffect(() => {
    BookingService.fetchAllDrafts().then((response) => {
     console.log(response);
     setDraftList(response.data.dataItems);
   })
   .catch((error) => {
     console.log("error");
   });




 }, [render]);

 const renderCard=(draft,index)=>
 {
   return (
  <Card style={{ width: "1200px", minHeight:"50px", marginTop: "20px",background: '#FFFFFF 0% 0% no-repeat padding-box',
  border: '1px solid #E2E2E2',
  borderRadius: '0px',
  opacity: '1' }}>
      <Grid item container xs={12} sm spacing={1} alignItems="center">
      <Grid item xs={2}>
      <LabelData>
           Draft {index+1}
        </LabelData>
        </Grid>
        <Grid item xs={3}>
      <LabelData>
         Created On : {draft.creationDate}
        </LabelData>

        </Grid>
        <Grid item xs={1}>
          </Grid>
      
      
          <Grid item xs={4}>
      <LabelData>
        {draft.currentStep}
        </LabelData>
        </Grid>

  
       
        <Grid item xs={1}>
        <IconButton
                                
                                style={{padding: "0px",marginTop:'10px'}}
                                onClick={() => {
                                  const activeStep=activeStepMap.get(draft.currentStep);
                                  let containerData=JSON.parse(draft.requestDetailsDraft);
                                  containerData.encryptedDraftId=draft.encryptedDraftId
                                 
                                  history.push("/createRequest",{activeStep:activeStep,containerData:containerData
                                  })
                                }}
                              >
                                {
                                 <img src="./next_page.svg"  style={{marginTop:'10px'}}
                                
                                 
                                 />
                                }
                              </IconButton>
                              </Grid>

                        
                              <Grid item xs={1}>

                              <img 
                      src="./delete.svg"  style={{marginTop:'10px'}}
                      onClick={() => {BookingService.deleteDraft(draft.encryptedDraftId) .then((response) => {
                        showToaster('SUCCESS');
                        setRender(render+1);
                      })
                      .catch((error) => {
                        showToaster('ERROR');
                        setRender(render+1);
                      });
                    }}
                    />
                    </Grid>
      </Grid>



        
    </Card>
   )
 }


 

  return (
    <>
    <InputLabel style={{color:'#0E1B3D',fontSize:'20px',fontFamily:'Dubai Medium',marginTop:'5px'}}>My Bookings/Draft</InputLabel>
    {draftList && draftList.map((draft,inx)=>{
       return(
         renderCard(draft,inx)
       )

    })}

{showToaster==='SUCCESS' && 
          <SuccessToast
          icon="check_circle"
          title="Delete Successful"
          message="Draft Deleted Successfuly"
          showToast={()=>{setShowToaster('NOTOASTER')}}
          position="top-right"
        />}

{showToaster==='ERROR' && 
          <ErrorToast
          icon="error" 
          title="Draft Delete Fail"
          message="Unable to delete draft"
          showToast={()=>{setShowToaster('NOTOASTER')}}
          position="top-right"
        />}

     </>
  )
}
export default React.memo(Drafts);
