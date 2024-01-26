package kurlyuser.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import kurlyuser.dao.ProductDAO;
import kurlyuser.dto.ProductDTO;

@WebServlet("/productview")
public class ProductViewServlet extends HttpServlet {
    private ProductDAO productDao= new ProductDAO(); 
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        BufferedReader reader = request.getReader();
        StringBuilder json = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            json.append(line);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        ProductDTO product = objectMapper.readValue(json.toString(), ProductDTO.class);
        
        ProductDTO productItems = productDao.getProductById(product.getProductId());
        if(productItems != null) {
            response.setStatus(HttpServletResponse.SC_OK);
            String cartItemsJson = objectMapper.writeValueAsString(productItems);
            response.getWriter().write(cartItemsJson);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"result\": \"fail\"}");
        }
    }
}
