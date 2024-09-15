"use client"
import { useState } from "react";
import { Box, Text, Image, Badge, Stack, ButtonGroup, Button } from "@chakra-ui/react";
import ModeloBotao from "../ModeloBotao";
import axios from "axios";
import SpinCarregando from "../SpinCarregando";

export default function CaixaProdutoCarrinho({comprado, idDoCarrinho, setCursosNoCarrinho, imagem, nome, preco, cargaHoraria, precoComDesconto, conteudo, id }) {
    const link =  `${process.env.NEXT_PUBLIC_LINK_SERVER}/carrinho?id=${idDoCarrinho}&usuario_id=${JSON.parse(localStorage.getItem("usuario")).id}`
    const [carregando, setCarregando] = useState(false)
    
    async function removerDoCarrinho(){
        setCarregando(true)
        try{
            const promisse = await axios.delete(link)
            //atualizando carrinho
            setCursosNoCarrinho(promisse.data)
            console.log("removido: ", promisse)
        }catch(e){
            console.log("erro ao tentar remover do carrinho", e)
        }
        setCarregando(false)
        // setProdutoSelecionado()
    }



    async function fecharPedido(){
        setCarregando(true)
        try{
            const promisse = await axios.put(link)
            setCursosNoCarrinho(promisse.data)
        }catch(e){
            console.log("Erro ao fechar pedido: ", e)
        }
        setCarregando(false)
    }


    return (
        <Box    
            display="flex"
            flexDir={{md:"row", base:"column", }}
            alignItems="center"
            justifyContent={{sm:"center", md: "space-around"}}
            as="div" 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden" 
            boxShadow="md" 
            p="4" 
            mb="6" 
            bg="white"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.03)" }}

        >
            <Image src={imagem} alt={nome} borderRadius="md" mb="4"  maxW="300px"/>

            <Box>
                <Text fontSize="xl" fontWeight="bold" mb="2">
                    {nome}
                </Text>
                
                <Stack direction="row" align="center" justify="space-between" mb="2">
                    <Badge fontSize="lg">
                        Parcelado: R$ {preco}
                    </Badge>
                </Stack>
                
                <Stack direction="row" align="center" justify="space-between" mb="2">
                    <Badge colorScheme="green" fontSize="lg">
                        Avista: R$ {precoComDesconto}
                    </Badge>
                </Stack>

                

                <Text fontSize="sm" color="gray.600" mb="2">
                    Carga Horária: {cargaHoraria}
                </Text>

                <Text fontSize="xs" color="gray.400">
                    ID do Produto: {id}
                </Text>


                {!comprado?
                <ButtonGroup 
                    isDisabled={carregando}
                    display="flex"
                    flexDir={{base:"column", sm:"row", md:"row", lg:"row"}}>
                    <ModeloBotao  
                        color="white" 
                        backgroundColor="#206eb3"
                        _hover={{backgroundColor:"#175388"}}
                        onClick={fecharPedido}
                        minW="150px"
                        >
                            {carregando?
                            <SpinCarregando />:
                            "Fechar pedido"
                            }
                        </ModeloBotao>
                    <ModeloBotao 
                        onClick={removerDoCarrinho} 
                        color="white" 
                        minW="150px"
                        backgroundColor="#ff4500"
                        _hover={{backgroundColor:"#ad2f02"}}
                        >
                            {carregando?
                            <SpinCarregando />:
                            "Remover do carrinho"}
                        </ModeloBotao>
                </ButtonGroup>:
                
                <Text color={"#28a745"}>Você já possui este curso!</Text>
                }
            </Box>
        
        </Box>
    );
}
