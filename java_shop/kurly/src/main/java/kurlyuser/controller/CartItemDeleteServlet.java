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
import kurlyuser.dto.UserCartDTO;

@WebServlet("/cartdelete")
public class CartItemDeleteServlet extends HttpServlet {
    private ProductDAO productDao= new ProductDAO(); // CartService는 장바구니 비즈니스 로직을 처리하는 클래스

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
        UserCartDTO cartDeleteDTO = objectMapper.readValue(json.toString(), UserCartDTO.class);

        boolean success = productDao.deleteCartProduct(cartDeleteDTO.getUserId(), cartDeleteDTO.getProductCode());
        
        if(success) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"result\": \"success\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"result\": \"fail\"}");
        }
    }
}
