import axiosInstance from '../util/myinterceptor'
// Change the API_URL to the correct location of the backend API before deploying the app
const API_URL = 'http://127.0.0.1:8000'


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
      return axiosInstance.put(url, task);
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
   addNewList(list: any) {
      const url = `${API_URL}/api/lists/`;
      return axiosInstance.post(url, list);
   }
   updateList(list: any) {
      const url = `${API_URL}/api/lists/${list.pk}`;
      return axiosInstance.put(url, list);
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
      const fd = new FormData();
      if (image != null) {
         for (let key in profile) {
            if (profile.hasOwnProperty(key)) {
               fd.append(key, profile[key]);
            }
         }
         fd.append('image', image)
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
      const url = `${API_URL}/api/getUser/`;
      return axiosInstance.get(url);
   }
   getAllUsers() {
      const url = `${API_URL}/api/getAllUsers/`;
      return axiosInstance.get(url);
   }
   getUserFromPK(pk: any) {
      const url = `${API_URL}/api/getUserFromPK/${pk}`;
      return axiosInstance.get(url);
   }
}

export default APIService;