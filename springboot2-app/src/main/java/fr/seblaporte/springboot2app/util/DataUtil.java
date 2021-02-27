package fr.seblaporte.springboot2app.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DataUtil {

	private static final Logger log = LoggerFactory.getLogger(DataUtil.class);

	/**
	 * 
	 * código defensivo, para não ter instâncias desnecessarias.
	 */
	private DataUtil() {
	}

	public static String formatarLocalDateFormatoPtBr(LocalDate localDate) {
		if (localDate == null)
			return "";
		String dataFormatada = "";
		try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
			dataFormatada = localDate.format(formatter);
		} catch (Exception e) {
			log.error("Erro ao tentar converter uma LocalDate: " + localDate.toString(), e);
		}
		return dataFormatada;
	}

	public static String formatarLocalDateTimeFormatoPtBr(LocalDateTime localDate) {
		if (localDate == null)
			return "";
		String dataFormatada = "";
		try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
			dataFormatada = localDate.format(formatter);
		} catch (Exception e) {
			log.error("Erro ao tentar converter uma LocalDate: " + localDate.toString(), e);
		}
		return dataFormatada;
	}

	public static String formatarLocalDateTimeFormatoPtBrApenasData(LocalDateTime localDate) {
		if (localDate == null)
			return "";
		String dataFormatada = "";
		try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
			dataFormatada = localDate.format(formatter);
		} catch (Exception e) {
			log.error("Erro ao tentar converter uma LocalDate: " + localDate.toString(), e);
		}
		return dataFormatada;
	}

	public static java.sql.Date converterDateUtilToDateSql(java.util.Date dateUtil) {
		java.sql.Date dataSql = new java.sql.Date(dateUtil.getTime());
		return dataSql;
	}

	public static String converterHoraMinutos(java.util.Date dateUtil) {
		SimpleDateFormat formatador = new SimpleDateFormat("HH:mm");
		return (dateUtil != null) ? formatador.format(dateUtil) : "";
	}

	public static String somarHoraMinutoComHoraMinuto(String horaMinuto1, String horaMinuto2) {

		String[] primeiraFormatacao = horaMinuto1.split(":");
		String[] segundaFormatacao = horaMinuto2.split(":");

		LocalDateTime localDateTimeNow = LocalDateTime.now();
		LocalDateTime localDateTime1 = LocalDateTime.now();
		// evento 1
		localDateTime1 = localDateTime1.plusHours(Integer.parseInt(primeiraFormatacao[0]))
				.plusMinutes(Integer.parseInt(primeiraFormatacao[1]));
		// evento 2
		localDateTime1 = localDateTime1.plusHours(Integer.parseInt(segundaFormatacao[0]))
				.plusMinutes(Integer.parseInt(segundaFormatacao[1]));

		Duration duration = Duration.between(localDateTimeNow, localDateTime1);
		String hora = String.valueOf(duration.toMinutes() / 60);
		hora = (hora.length() == 1) ? "0" + hora : hora;
		String minuto = String.valueOf((duration.toMinutes() - ((duration.toMinutes() / 60) * 60)));
		minuto = (minuto.length() == 1) ? "0" + minuto : minuto;
		return hora + ":" + minuto;

	}

	public static Timestamp converteDataToTimeStamp(String date) {

		Timestamp timestamp = null;
		try {
			String str = formatarDataBrasileiroComHifenParaBarra(date);
			str = (str.length() == 10) ? (str + " 00:00:00") : str;
			LocalDateTime ldt = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
			timestamp = Timestamp.valueOf(ldt);
		} catch (Exception e) {
			log.error("Erro ao tentar converter uma LocalDate: " + date, e);
		}
		return timestamp;
	}

	/**
	 * Método que converter data hora (dd/MM/yyyy HH:mm:ss ou dd-MM-yyyy HH:mm:ss)
	 * no formato string para local date time com a seguinte formatação (dd/MM/yyyy
	 * HH:mm:ss).
	 * 
	 * @param date datae hora no valor string padrão brasileiro
	 * @return retorna um LocalDateTime com data e hora no formata brasileiro
	 */
	public static LocalDateTime converteDataHoraToLocalDateTime(String date) {
		LocalDateTime ldt = null;
		if(date != null && (!date.isBlank())) {
			try {
				boolean contains = date.contains(".");
				if (contains) {
					int indexOf = date.indexOf(".");					
					date = date.substring(0,indexOf);	
				}
				
				String str = formatarDataBrasileiroComHifenParaBarra(date);
				str = (str.length() == 10) ? (str + " 00:00:00") : str;
				ldt = LocalDateTime.parse(str, DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
			} catch (Exception e) {
				log.error("Erro ao tentar converter uma LocalDate: " + date, e);
			}
		}
		return ldt;
	}
	
	

	/**
	 * Método que formata um localdate padrão ISO(yyyy-MM-dd) para timestamp
	 * ((yyyy-MM-dd HH:mm:ss.S)
	 * 
	 * @param date recebe um data com hora ou somente uma data
	 * @return retonar um timestamp no formato iso com data e hora e segundos.
	 */
	public static Timestamp converteDataFormatoISOToTimeStamp(LocalDate date) {

		Timestamp timestamp = null;
		try {
			timestamp = Timestamp.valueOf(date.atTime(LocalTime.MIDNIGHT));
		} catch (Exception e) {
			log.error("Erro ao tentar converter uma LocalDate: " + date, e);
		}
		return timestamp;
	}

	public static java.sql.Date converteDataTimeToDateSql(String date) {
		String str = formatarDataBrasileiroComHifenParaBarra(date);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate dateTime = LocalDate.parse(str, formatter);
		return java.sql.Date.valueOf(dateTime);
	}

	private static String formatarDataBrasileiroComHifenParaBarra(String dataComHifen) {
		String dataFormatada = dataComHifen.replaceAll("-", "/");
		return dataFormatada;
	}

	public static boolean compararHorasMinutosString(String horasMinutos1, String horasMinutos2) {

		String[] primeiraFormatacao = horasMinutos1.split(":");
		String[] segundaFormatacao = horasMinutos2.split(":");

		int hr1 = Integer.parseInt(primeiraFormatacao[0] + primeiraFormatacao[1]);
		int hr2 = Integer.parseInt(segundaFormatacao[0] + segundaFormatacao[1]);

		if (hr1 > hr2) {
			return true;
		} else {
			return false;
		}
	}

	public static LocalDate stringToLocalDate(String localDate) {

		String[] formatacao = localDate.split("-");
		int dia;
		int mes;
		int ano;

		if (formatacao.length == 1) {
			formatacao = localDate.split("/");
			dia = Integer.parseInt(formatacao[0]);
			mes = Integer.parseInt(formatacao[1]);
			ano = Integer.parseInt(formatacao[2]);
		} else {
			dia = Integer.parseInt(formatacao[2]);
			mes = Integer.parseInt(formatacao[1]);
			ano = Integer.parseInt(formatacao[0]);
		}

		LocalDate ld = LocalDate.of(ano, mes, dia);

		return ld;
	}

	public static LocalDateTime somarHoraMinutoComLocalDateTime(String horaMinuto, LocalDateTime ldt) {

		String[] formatacao = horaMinuto.split(":");

		int hora = Integer.parseInt(formatacao[0]);
		int minuto = Integer.parseInt(formatacao[1]);

		return ldt.plusHours(hora).plusMinutes(minuto);
	}

	private static String metodoTeste() {
		// definir hora iniciar
		LocalDateTime localDateTimeNow = LocalDateTime.now();
		LocalDateTime localDateTime1 = LocalDateTime.now();
		// evento 1
		localDateTime1 = localDateTime1.plusHours(12).plusMinutes(20);
		System.out.println(localDateTime1);
		// evento 2
		localDateTime1 = localDateTime1.plusHours(12).plusMinutes(45);

		System.out.println(localDateTime1);

		Duration duration = Duration.between(localDateTimeNow, localDateTime1);
		return duration.toMinutes() / 60 + ":" + (duration.toMinutes() - ((duration.toMinutes() / 60) * 60));
	}

	public static String getMes(String m) {
		String mes = "";
		switch (m) {
		case "01":
			mes = "Jan";
			break;
		case "02":
			mes = "Feb";
			break;
		case "03":
			mes = "Mar";
			break;
		case "04":
			mes = "Abr";
			break;
		case "05":
			mes = "Mai";
			break;
		case "06":
			mes = "Jun";
			break;
		case "07":
			mes = "Jul";
			break;
		case "08":
			mes = "Ago";
			break;
		case "09":
			mes = "Set";
			break;
		case "10":
			mes = "Out";
			break;
		case "11":
			mes = "Nov";
			break;
		case "12":
			mes = "Dez";
			break;
		}

		return mes;
	}

	/**
	 * Método que calcular a diferente entre datas e retona uma string no
	 * formato(00:00:00) de horas.
	 * 
	 * @param inicio data hora de inicio
	 * @param fim    data hora de final
	 * @return retona uma string no formato(00:00:00) de horas.
	 */
	public static String calularDiferencaEntreLocalDateTime(LocalDateTime inicio, LocalDateTime fim) {
		String data = "";
		if (inicio != null) {
			LocalDateTime hoje = inicio;
			LocalDateTime outraData = (fim == null ? LocalDateTime.now() : fim);
			long diferencaEmDias = ChronoUnit.MINUTES.between(hoje, outraData);
			Duration d = Duration.ofMinutes(diferencaEmDias);
			String dias = String.valueOf(d.toDaysPart());
			String horas = String.valueOf(d.toHoursPart());
			String minutos = String.valueOf(d.toMinutesPart());
			data = String.format("%02d", Integer.parseInt(dias)) + ":" + String.format("%02d", Integer.parseInt(horas))
					+ ":" + String.format("%02d", Integer.parseInt(minutos));
		}

		return data;
	}

	/**
	 * método que splita data para localdatetime(dd/MM/YYYY HH:MM:SS), por favor utilizar metodo que
	 * converter a converterStringDataHoraPtBrParaLocalDateTime
	 * @deprecated
	 * @param data
	 * @return
	 */
	@Deprecated
	public static LocalDateTime getLocalDateTimePtBr(String data) {
		Integer dia, mes, ano, hora, minutos, segundos = 0;
		dia = Integer.parseInt(data.substring(0, 2));
		mes = Integer.parseInt(data.substring(3, 5));
		ano = Integer.parseInt(data.substring(6, 10));
		hora = Integer.parseInt(data.substring(11, 13));
		minutos = Integer.parseInt(data.substring(14, 16));
//		segundos = Integer.parseInt(data.substring(17, 19));
		LocalDateTime ldtAbertura = LocalDateTime.of(ano, mes, dia, hora, minutos, segundos);
		return ldtAbertura;

	}

	/**
	 * método que splita data para localdatetime(YYYY/MM/DD HH:MM:SS), por favor utilizar metodo que
	 * converter a converterStringDataHoraPtBrParaLocalDateTime
	 * 
	 * @deprecated
	 * @param data
	 * @return
	 */
	@Deprecated
	public static LocalDateTime getLocalDateTime(String data) {
		Integer dia, mes, ano, hora, minutos, segundos;
		ano = Integer.parseInt(data.substring(0, 4));
		mes = Integer.parseInt(data.substring(5, 7));
		dia = Integer.parseInt(data.substring(8, 10));
		hora = Integer.parseInt(data.substring(11, 13));
		minutos = Integer.parseInt(data.substring(14, 16));
		segundos = Integer.parseInt(data.substring(17, 19));
		LocalDateTime ldtAbertura = LocalDateTime.of(ano, mes, dia, hora, minutos, segundos);
		return ldtAbertura;

	}

   /**
	 * métodp que converter string oara localdatatime(yyyy-MM-dd HH:mm")
	 * @param data
	 * @return
	 */
	public static LocalDateTime converterStringDataHoraISOParaLocalDateTime(String date) {
		LocalDateTime ldt = null;
		try {
			String str = formatarDataBrasileiroComHifenParaBarra(date);
			str = (str.length() == 10) ? (str + " 00:00") : str;
			ldt = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
		} catch (Exception e) {
			log.error("Erro ao tentar converter uma LocalDate: " + date, e);
		}
		return ldt;
	}

	/**
	 * Converte um LocalDateTime em java.util.Date.
	 * @param valor
	 * @return Date
	 */
	public static java.util.Date converterToDataUtil(LocalDateTime valor) {
		return java.util.Date.from(valor.toInstant(ZoneOffset.UTC));
	}
	
	/**
	 * Converte o java.util.Date em LocalDate 	
	 * @param date
	 * @return
	 */
	public static LocalDate toLocalDate(java.util.Date date) {
		LocalDate novaData = null;
		
		if (date != null) {
			// Usado em versao JVM inferior a 9.0
			//return new java.sql.Date(date.getTime()).toLocalDate();
			novaData = LocalDate.ofInstant(date.toInstant(), ZoneId.of("GMT-3")); // ZoneId.systemDefault()
		}	
		
		return novaData;
	}	
	
}
