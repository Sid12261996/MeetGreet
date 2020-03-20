import axios from 'axios';
const baseService = {};


baseService.axios = axios.defaults.headers.common['Authorization'] = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNpZGhhcnRocmtjQGdtYWlsLmNvbSIsIk5hbWUiOiJTaWQgdGhlIGdyZWF0IiwiaWF0IjoxNTg0NzI4MjU2fQ.UQQ3tuFNHq6CngmsWXGWKn56iDgUM0WTbx7VSASFiC0";
// baseService.axios = axios;
export default baseService
