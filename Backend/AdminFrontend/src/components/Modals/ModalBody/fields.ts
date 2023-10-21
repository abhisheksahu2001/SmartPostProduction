 export const modelFields =  {
    LogEntry:{
        action_time:'',	
        object_id:'',	
        object_repr:'',	
        action_flag:'',	
        change_message:'',	
        content_type_id:'',	
        user_id:'',
    },
    Plans : {
    plan_id:'',
    plan_type:'',
    plan_details:'',
    plan_post_limit:'',
    plan_post_schedule:'',
    
},
  MainData : {
    user_active:'',
    plan_status:'',
    plan_expiry:'',
    plan_activate:'',
    name:'',
    details:'',
    
    admin_id:'',
    plan_id_id:'',
    session_id:'',
    
},
  User : {
    email:'',
    name:'',
    password:'',
    profile_pic:'',
    
},
Group:{
    name:'',
},
  Permission : {
    name:'',
    content_type_id:0,
    codenane:'',
}, 
  ContentType : {
    app_label:'',
    model:'',
},
  Migrations : {
    app:'',
    name:'',
    applied:''
},
  Session : {
    session_key : '',
    session_data:'',
    expire_data:''
},
  FaceBookPage : {
    page_id:'',	
    page_extended_access_token:'',	
    page_extended_token_expiry:'',	
    page_profile_pic_url:'',	
    page_name:'',	
    fb_user_id_id:'',
},
  FaceBookUser : {
    user_access_token:'',	
    user_access_token_expiry:'',	
    user_extended_token:'',	
    user_extended_token_expiry:'',	
    user_token_status:'',	
    user_id:'',	
    admin_id_id:'',
},
  Subscription : {
    subscription_id:'',	
    plan_id:'',	
    customer_id:'',	
    status:'',	
    start_at:'',	
    end_at:'',	
   
    user_id:'',	
},
  UserPlanDetails : {
    plan_type:'',	
    plan_status:'',	
    start_at:'',	
    end_at:'',	
    user_post_count:'',	
    user_post_schedule_count:'',	
    user_id:'',
},

}
