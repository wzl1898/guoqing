import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import Personal from '@/pages/Personal/Personal.vue'
import Index from '@/pages/Index/Index.vue'
import Apply from '@/pages/Apply/Apply.vue'
import EvidenceRecord from '@/pages/EvidenceRecord/EvidenceRecord.vue'
import Message from '@/pages/Message/Message.vue'
import PersonalInfo from '@/pages/PersonalInfo/PersonalInfo.vue'
import Application from '@/pages/Application/Application.vue'
import Approve from '@/pages/Approve/Approve.vue'
import ApproveProcess from '@/pages/Approve/ApproveProcess.vue'


export default [
  {
    path: '/',
    redirect: "/home",
    component: Index,
    children: [
      {
        path: 'personal',
        component: Personal
      },
      {
        path: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: "/apply",
    component: Apply
  },
  {
    path: "/evidence-record",
    component: EvidenceRecord
  },
  {
    path: "/user-message",
    component: Message
  },
  {
    path: "/personal-information",
    component: PersonalInfo
  },
  {
    path: "/user-application",
    component: Application
  },
  {
    path: "/user-approve",
    component: Approve
  },
  {
    path: "/approve-process/:id",
    component: ApproveProcess
  }

]
