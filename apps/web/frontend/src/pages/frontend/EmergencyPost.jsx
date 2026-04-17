// EmergencyPost.jsx
const [request, setRequest] = useState({
  bloodGroup: '',
  hospital: '',
  bagsNeeded: '',
});

const handleSubmit = async () => {
  await axios.post("http://localhost:5000/emergency-requests", request);
  alert("Request Posted Successfully!");
};