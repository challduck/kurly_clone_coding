package kurlyuser.controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import kurlyuser.dao.ProductDAO;
import kurlyuser.dto.CartQuantityDTO;

@WebServlet("/increment")
public class CartProductIncrementServlet extends HttpServlet {
    private ProductDAO productDao = new ProductDAO();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        BufferedReader reader = request.getReader();
        StringBuilder json = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            json.append(line);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        CartQuantityDTO cartItem = objectMapper.readValue(json.toString(), CartQuantityDTO.class);

        boolean success = productDao.increaseCartProductQuantity(cartItem.getUserId(), cartItem.getProductId());

        if (success) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"result\": \"success\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"result\": \"fail\"}");
        }
    }
}