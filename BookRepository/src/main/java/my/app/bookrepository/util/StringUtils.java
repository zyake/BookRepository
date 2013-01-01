package my.app.bookrepository.util;


import java.io.BufferedReader;
import java.io.IOException;

public class StringUtils {

    public static String readFully(BufferedReader reader) {
        StringBuilder stringBuilder = new StringBuilder();
        String line = null;
        try {
            while ( ( line = reader.readLine() ) != null ) {
                stringBuilder.append(line + "\r\n");
            }

            return stringBuilder.toString();
        } catch (IOException e) {
            throw new UtilException("reading buffer failed", e);
        }
    }
}
