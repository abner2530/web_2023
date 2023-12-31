import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Editar = () => {

    let { id } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            /*let professor = getProfessorById(id)
            if(professor) {
                setNome(professor.nome)
                setCurso(professor.curso)
                setTitulacao(professor.titulacao)
                setAi(professor.ai)
            }*/
            //console.log(professor)

            axios.get(`http://localhost:3002/aluno/retrieve/${id}`)
                .then(
                    (response) => {
                        setNome(response.data.nome)
                        setCurso(response.data.curso)
                        setIra(response.data.ira)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )

    /*function getProfessorById(id){
        for(let i=0;i<professores.length;i++)
            if(professores[i].id == id) return professores[i]
        return null
    }*/

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState("0.0")

    function handleSubmit(event) {
        event.preventDefault()

        const alunoAtualizado = { nome, curso, ira }
        axios.put(`http://localhost:3002/aluno/update/${id}`, alunoAtualizado)
            .then(
                (response) => {
                    alert(`Aluno ID ${response.data._id} atualizado!`)
                    navigate("/listarAluno")
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Editar Aluno
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    name="nome"
                    value={nome}
                    label="Nome Completo"
                    autoFocus
                    onChange={(event) => setNome(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="curso"
                    name="curso"
                    value={curso}
                    label="Curso"
                    onChange={(event) => setCurso(event.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    name="ira"
                    value={ira}
                    label="Ira"
                    onChange={(event) => setIra(event.target.value)}
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ my: 3 }}
                    >
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </>
    )
}
export default Editar