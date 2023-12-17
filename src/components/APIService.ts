import { Task } from '../models/TaskList';
import axiosInstance from '../util/myinterceptor'
// Change the API_URL to the correct location of the backend API before deploying the app
const API_URL = 'https://dannyjll.pythonanywhere.com'


export class APIService {
   getTask(param_pk: any) {
      const url = `${API_URL}/api/tasks/${param_pk}`;
      return axiosInstance.get(url);
   }
   getTaskList() {
      const url = `${API_URL}/api/tasks/`;
      return axiosInstance.get(url);
   }
   addNewTask(task: any) {
      const url = `${API_URL}/api/tasks/`;
      return axiosInstance.post(url, task);
   }
   updateTask(task: any) {
      const url = `${API_URL}/api/tasks/${task.pk}`;
      return axiosInstance.put<Task>(url, task);
   }
   deleteTask(task_pk: any) {
      const url = `${API_URL}/api/tasks/${task_pk}`;
      return axiosInstance.delete(url);
   }
   getMyTasks() {
      const url = `${API_URL}/api/mytasks/`;
      return axiosInstance.get(url);
   }
   getList(param_pk: any) {
      const url = `${API_URL}/api/lists/${param_pk}`;
      return axiosInstance.get(url);
   }
   getListList() {
      const url = `${API_URL}/api/lists/`;
      return axiosInstance.get(url);
   }
   getMyListList() {
      const url = `${API_URL}/api/mylists/`;
      return axiosInstance.get(url);
   }
   getTasksFromListPK(list_pk: any) {
      const url = `${API_URL}/api/gettasksfromlist/${list_pk}`;
      return axiosInstance.get(url);
   }
   addNewList(list: any, image: any) {
      const url = `${API_URL}/api/lists/`;
      const imagetype = typeof(image)
      const fd = new FormData();
      if (image != null) {
         for (let key in list) {
            if (list.hasOwnProperty(key)) {
               if (key == 'group_set' || key == 'category' || key == 'task_set') {
                  for (let k in list[key]) {
                     fd.append(key, JSON.stringify(list[key][k]))
                  }
               }
               else if (key == 'list_image' && imagetype == 'string') {
                  continue
               }
               else {
                  fd.append(key, list[key]);
               }
            }
         }
      }
      return axiosInstance.post(url, fd);
   }
   updateList(list: any, image: any) {
      const url = `${API_URL}/api/lists/${list.pk}`;
      const imagetype = typeof(image)
      const fd = new FormData();
      if (image != null) {
         for (let key in list) {
            if (list.hasOwnProperty(key)) {
               if (key == 'group_set' || key == 'category' || key == 'task_set') {
                  for (let k in list[key]) {
                     fd.append(key, JSON.stringify(list[key][k]))
                  }
               }
               else if (key == 'list_image' && imagetype == 'string') {
                  continue
               }
               else {
                  fd.append(key, list[key]);
               }
            }
         }
      }
      return axiosInstance.put(url, fd);
   }
   deleteList(list_pk: any) {
      const url = `${API_URL}/api/lists/${list_pk}`;
      return axiosInstance.delete(url);
   }
   getGroup(param_pk: any) {
      const url = `${API_URL}/api/groups/${param_pk}`;
      return axiosInstance.get(url);
   }
   getGroupList() {
      const url = `${API_URL}/api/groups/`;
      return axiosInstance.get(url);
   }
   getMyGroupList() {
      const url = `${API_URL}/api/mygroups/`;
      return axiosInstance.get(url);
   }
   getUsersFromGroup(pk: any) {
      const url = `${API_URL}/api/getusersfromgroup/${pk}`;
      return axiosInstance.get(url);
   }
   getListsFromGroup(pk: any) {
      const url = `${API_URL}/api/getlistsfromgroup/${pk}`;
      return axiosInstance.get(url);
   }
   addNewGroup(group: any) {
      const url = `${API_URL}/api/groups/`;
      return axiosInstance.post(url, group);
   }
   updateGroup(group: any) {
      const url = `${API_URL}/api/groups/${group.pk}`;
      return axiosInstance.put(url, group);
   }
   deleteGroup(group_pk: any) {
      const url = `${API_URL}/api/groups/${group_pk}`;
      return axiosInstance.delete(url);
   }
   getProfile(param_pk: any) {
      const url = `${API_URL}/api/profiles/${param_pk}`;
      return axiosInstance.get(url);
   }
   getProfileList() {
      const url = `${API_URL}/api/profiles/`;
      return axiosInstance.get(url);
   }
   getMyProfile() {
      const url = `${API_URL}/api/myprofile/`;
      return axiosInstance.get(url);
   }
   addNewProfile(profile: any, image: any) {
      const url = `${API_URL}/api/profiles/`;
      const fd = new FormData();
      if (image != null) {
         for (let key in profile) {
            if (profile.hasOwnProperty(key)) {
               fd.append(key, profile[key]);
            }
         }
         fd.append('image', image)
         return axiosInstance.post(url, fd);
      }
      else {
         return axiosInstance.post(url, profile);
      };
   }
   updateProfile(profile: any, image: any) {
      const url = `${API_URL}/api/profiles/${profile.pk}`;
      const imagetype = typeof(image)
      const fd = new FormData();
      if (image != null) {
         for (let key in profile) {
            if (profile.hasOwnProperty(key)) {
               if (key == 'randomstring') {
                  for (let k in profile[key]) {
                     fd.append(key, JSON.stringify(profile[key][k]))
                  }
               }
               else if (key == 'image' && imagetype == 'string') {
                  continue
               }
               else {
                  fd.append(key, profile[key]);
               }
            }
         }
      }
      return axiosInstance.put(url, fd);
   }
   deleteProfile(profile_pk: any) {
      const url = `${API_URL}/api/profiles/${profile_pk}`;
      return axiosInstance.delete(url);
   }
   getReminder(param_pk: any) {
      const url = `${API_URL}/api/reminders/${param_pk}`;
      return axiosInstance.get(url);
   }
   getReminderList() {
      const url = `${API_URL}/api/reminders/`;
      return axiosInstance.get(url);
   }
   addNewReminder(reminder: any) {
      const url = `${API_URL}/api/reminders/`;
      return axiosInstance.post(url, reminder);
   }
   updateReminder(reminder: any) {
      const url = `${API_URL}/api/reminders/${reminder.pk}`;
      return axiosInstance.put(url, reminder);
   }
   deleteReminder(reminder_pk: any) {
      const url = `${API_URL}/api/reminders/${reminder_pk}`;
      return axiosInstance.delete(url);
   }
   authenticateLogin(credentials: any) {
      const url = `${API_URL}/api/`;
      return axiosInstance.post(url, credentials);
   }
   registerUser(credentials: any) {
      const url = `${API_URL}/register/`;
      credentials.customusername = credentials.username
      return axiosInstance.post(url, credentials);
   }
   getUser() {
      const url = `${API_URL}/api/getuser/`;
      return axiosInstance.get(url);
   }
   getUserFromProfilePK(profile_pk: any) {
      const url = `${API_URL}/api/getuserfromprofilepk/${profile_pk}`;
      return axiosInstance.get(url);
   }
   getProfileFromUserPK(user_pk: any) {
      const url = `${API_URL}/api/getprofilefromuser/${user_pk}`;
      return axiosInstance.get(url);
   }
   getAllUsers() {
      const url = `${API_URL}/api/getallusers/`;
      return axiosInstance.get(url);
   }
   getUserFromPK(pk: any) {
      const url = `${API_URL}/api/getuserfrompk/${pk}`;
      return axiosInstance.get(url);
   }
}

export default APIService;